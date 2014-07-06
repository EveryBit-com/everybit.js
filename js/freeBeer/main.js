// Bridge between visualization framework and js/forum files

puffworldprops = {
    clusters: {
        filter: true,
        publish: true,
        view: true,
        identity: true,
        preferences: true,
        about: false,
        tools: false

    },

    menu: {
        show: false,
        prefs: false,
        profile: false,
        section: false, // the section user is currently working on

        user: {
            pick_one: false,
            manage: false,
            show_bc: false,
            show_key: false
        }
    },

    view: {
        filter: {
            routes: [],
            users : []
        },
        language  : 'en',
        style     : 'PuffRoots',
        puff      : false,                              // focused puff (not just sig)
        user      : false,                              // username // TODO: make this part of filter
        mode      : 'browse',                           // 'browse' or 'arrow'
        rows      : 4,
        cols      : 5,
        boxRatio  : 1,
        animation : true,                               // true -> animate everything; false -> animate nothing
        cursor    : false,                              // sig of selected puff
        showinfo  : false                               // true -> always show info boxes; false -> only on hover
    },

    reply: {
        parents: [],
        show: false,
        expand: false,
        content: '',
        state: {},
        type: 'text'
    },

    raw: {
        puffs: []
    },

    prefs: { },
    profile: { },
    tools: {
        users: {
            resultstyle: 'raw',
            puffstyle: 'raw'
        }
    }
}

puffworlddefaults = puffworldprops                      // it's immutable so we don't care




//// event bindings for controlling core behavior from the display

events.sub('prefs/storeKeychain/toggle', function(data, path) {
    var new_state = !PuffWardrobe.getPref('storeKeychain')
    PuffWardrobe.setPref('storeKeychain', new_state)

    var dir = new_state ? 'on' : 'off'
    events.pub('ui/menu/prefs/storeKeychain/' + dir)
})

events.sub('profile/nickname/set', function(data, path) {
    var nickname = data.nickname
    if(!nickname)
        return Puffball.onError('Invalid nickname')  // THINK: do this in React? use Puffball.validations?

    PuffWardrobe.setProfileItem('nickname', nickname)

    events.pub('ui/menu/profile/nickname/set')
})


///// event bindings that are specific to the GUI //////

events.sub('ui/*', function(data, path) {
    //// rerender on all ui events

    // OPT: batch process recent log items on requestAnimationFrame

    update_puffworldprops(data)                             // change props in a persistent fashion

    setURLfromViewProps()                                     // set the props in the url and history

    puffworldprops.reply.preview = false;                   // THINK: what is this?
    
    updateUI()                                              // then re-render PuffWorld w/ the new props
})






// TODO: move these somewhere nicer

formatForDisplay = function(obj, style) {
    if(style == 'formatted') {
        return JSON.stringify(obj, null, 2)
            .replace(/[{}",\[\]]/g, '')
            .replace(/^\n/, '')
            .replace(/\n$/, '');
    }

    // style is raw
    return JSON.stringify(obj).replace(/^\{\}$/, '');
}

humanizeUsernames = function(username) {
    if(/^[A-Za-z0-9]{32}$/.test(username))
        return username.slice(0, 7) + '...'
    return username
}

reduceUsernameToAlphanumeric = function(username) {
    return username.split(/[^A-Za-z0-9]/).join('');
}




/////// minimap ////////

// <div id="minimap"></div>

// var updateMinimap = function() {  
//   var mapdom = $('#minimap')
//   
//   // PuffData.getShells().forEach(function(puff) {
//   //   template = '<p><a href="#" onclick="showPuff(PuffForum.getPuffBySig(\'' 
//   //            + puff.sig + '\'));return false;" class="under">' 
//   //            + puff.sig + '</a></p>'
//   //   mapdom.append($(template))
//   // })
// }

////// end minimap /////





function draggableize(el) {
    // modified from http://jsfiddle.net/tovic/Xcb8d/light/
    var x_pos = 0,  y_pos = 0,  // Stores x & y coordinates of the mouse pointer
        x_elem = 0, y_elem = 0; // Stores top, left values (edge) of the element

    // Will be called when user starts dragging an element
    function drag_init(e) {
        // Store the object of the element which needs to be moved
        x_pos = e.pageX;
        y_pos = e.pageY;
        x_elem = x_pos - el.offsetLeft;
        y_elem = y_pos - el.offsetTop;
        document.addEventListener('mousemove', move_el);
        return false
    }

    // Will be called when user dragging an element
    function move_el(e) {
        x_pos = e.pageX;
        y_pos = e.pageY;
        el.style.left = (x_pos - x_elem) + 'px';
        el.style.top  = (y_pos - y_elem) + 'px';
    }

    // Bind the functions...
    el.addEventListener('mousedown', drag_init);
    el.addEventListener('mouseup', function() {
        document.removeEventListener('mousemove', move_el);
    });
}



//// props and urls and pushstate oh my ////

function setURLfromViewProps() {
    var viewprops = PB.shallow_copy(puffworldprops.view)
    
    // TODO: fix this
    if(viewprops.puff)
        viewprops.puff = viewprops.puff.sig
    else
        delete viewprops.puff
    
    setURL(viewprops)
}

function setURL(state, path) {
    var currentState = history.state || {}
    var flatCurrent  = JSON.stringify(currentState)
    var flatState    = JSON.stringify(state)

    if(flatState == flatCurrent)                                            // are they equivalent?
        return false

    var url = convertStateToURL(state)

    history.pushState(state, path || '', url)

    // saving in case we need this in the future
    //
    // var cloneCurrent = JSON.parse(flatCurrent)
    // var cloneState = JSON.parse(flatState)
    // delete cloneCurrent.cursor
    // delete cloneState.cursor
    //     
    // if(JSON.stringify(cloneState) == JSON.stringify(cloneCurrent))       // equiv up to cursor?
    //     return false
}

function convertStateToURL(state) {
    state = stashKeysFromURL(state)
    state = PB.flatten(state)
    
    var url = Object.keys(state)
                    .filter(function(key) {return key && state[key] && state[key].length !== 0})
                    .map(function(key) {
                        return encodeURIComponent(key) + "=" 
                             + encodeURIComponent(state[key].join ? state[key].join('~') : state[key] || '') })
                    .join('&')

    return '?' + url
}


function setPropsFromURL() {
    var qobj  = getQuerystringObject()
    Object.keys(qobj).forEach(function(key) {qobj[key] = !~qobj[key].indexOf('~') ? qobj[key] : qobj[key].split('~')})
    var pushstate = PB.unflatten(qobj)
    setPropsFromPushstate(pushstate)
}

function setPropsFromPushstate(pushstate) {
    var sig = pushstate.puff
    
    // TODO: move most of this to convertURLToState and move the fancy stuff in to renderPuffWorld

    if(sig)
        pushstate.puff = PuffForum.getPuffBySig(sig)

    var props = Object.keys(pushstate).reduce(function(acc, key) {acc['view.' + key] = pushstate[key]; return acc}, {})
    
    update_puffworldprops(props)

    if(!sig || props['view.puff']) {                            // we've got it
        return updateUI()
    }

    var prom = PuffData.pending[sig]                            // we ain't got it
    if(!prom)
        return Puffball.onError('Bad sig in pushstate')

    prom.then(function(puffs) {                                 // now we have it
        props['view.puff'] = puffs[0]
        update_puffworldprops(props)
        updateUI()
    })
}

function getQuerystringObject() {
    return window.location.search.substring(1).split('&')
        .reduce(function(acc, chunk) {
            var pair = chunk.split('=')
            acc[decodeURIComponent(pair[0])] = decodeURIComponent(pair[1])
            return acc}, {})
}

// TODO: what we really want is to stash these *on first page load*, and to replace the history at that point 
//       so we skip it when going back through time. if we do that then we don't need to look for these every 
//       time we update the URL.

stashedKeysFromURL = {}

function stashKeysFromURL(state) {
    state = PB.shallow_copy(state) // clone before delete
    var keysToStash = ['requestedUsername', 'network', 'token', 'requestedUserId']
    
    for(var key in state) {
        if(!~keysToStash.indexOf(key)) continue
        stashKeysFromURL[key] = state[key]
        delete state[key]
    }
    
    return state
}

function getStashedKeysFromURL() {
    return stashedKeysFromURL
}




///// Puff display helpers /////// 



function showPuff(sig) {
    //// show a puff and do other stuff

    if(!sig)
        return false

    var puff = PuffForum.getPuffBySig(sig)                          // get it?

    if(puff)
        return showPuffDirectly(puff)                               // got it.

    var prom = PuffData.pending[sig]                                // say what?
    if(!prom)
        return Puffball.onError('Bad sig in pushstate')

    prom.then(function(puffs) {                                     // okay got it.
        showPuffDirectly(puffs[0])
    })
}

function showPuffDirectly(puff) {
    //// show a puff with no checks or balances
    events.pub('ui/show/tree', { 'view.style': 'PuffTallTree'
                               , 'view.puff' : puff
                               , 'menu'      : puffworlddefaults.menu
                               , 'reply'     : puffworlddefaults.reply})
}


function renderPuffWorld() {
    var puffworlddiv = document.getElementById('puffworld')         // OPT: cache this for speed

    // puffworldprops has to contain some important things like prefs
    // THINK: this is probably not the right place for this...
    puffworldprops.prefs = PuffWardrobe.getAllPrefs()
    puffworldprops.profile = PuffWardrobe.getAllProfileItems()

    React.renderComponent(PuffWorld(puffworldprops), puffworlddiv)
}

update_puffworldprops = function(data) {
    puffworldprops = PB.persistent_merge(puffworldprops, data)
}




///////// PuffForum Interface ////////////

// NOTE: this has to load last, so keep it at the bottom

window.requestAnimationFrame = window.requestAnimationFrame       || window.mozRequestAnimationFrame
                            || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame
                            || setTimeout

var updateUI = onceRAF.bind(this, renderPuffWorld)  // only update once per rAF

var eatPuffs = function(puffs) {
    if(!Array.isArray(puffs) || !puffs.length)
        return false;

    updateUI();
}

PuffForum.onNewPuffs(eatPuffs);                     // register our update function

PuffForum.init();                                   // initialize the forum module (and by extension the puffball network)

PuffWardrobe.setPref('storeKeychain', true);        // TODO: make this based on config, and changeable

setPropsFromURL();                                  // handle pushstate hash

window.addEventListener('resize', function() {
    updateUI();
});

window.addEventListener('load', function() {
    /// this is cumbersome, but it gets around browser inconsistencies (some fire popstate on page load, others don't)
    //  via https://code.google.com/p/chromium/issues/detail?id=63040
    setTimeout(function() {
        window.addEventListener('popstate', function(event) {
            if(event.state)
                return setPropsFromPushstate(event.state);

            puffworldprops = puffworlddefaults;
            updateUI();
        });
    }, 0);
});


////////// End PuffForum Interface ////////////
