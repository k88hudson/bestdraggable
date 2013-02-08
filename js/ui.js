document.addEventListener( "DOMContentLoaded", function() {
  var test1 = document.getElementById( "test1" ),
      test2 = document.getElementById( "test2" ),
      test3 = document.getElementById( "test3" ),
      test4 = document.getElementById( "test4" ),
      test5 = document.getElementById( "test5" ),
      test6 = document.getElementById( "test6" ),
      test7 = document.getElementById( "test7" );
      test8 = document.getElementById( "test8" ),
      test4b = document.getElementById( "test4b" );

  var xy = document.querySelector( ".ui-dragging-x-y" );

  function disablePE( e, ui ) {
    $( "iframe" ).addClass( "disable-pointer-events" );
  }

  function enablePE( e, ui ) {
    $( "iframe" ).removeClass( "disable-pointer-events" );
  }

  function disableDraggable( target ) {
    var innerSpan = target.querySelector( "span" ),
        innerImg = target.querySelector( ".cropped-image-container > img" );

    $( target ).draggable( "disable" );
    target.classList.add( "editing" );
    if ( innerImg ) {
      var clone = target.querySelector( ".crop-clone" );
      $( clone ).draggable({
        start: function( e, ui ) {
        },
        drag: function( e, ui ) {
          innerImg.style.left = ui.position.left + "px";
          innerImg.style.top = ui.position.top + "px";
        },
        stop: function( e, ui ) {
        }
      });
    }
    document.addEventListener( "click", function enableDraggable( e ) {
      if ( e.target !== target && !$.contains( target, e.target ) ) {
        $( target ).draggable( "enable" );
        target.classList.remove( "editing" );
        document.removeEventListener( "click", enableDraggable, false );
        if ( innerSpan ) {
          $( innerSpan ).blur();
        }
        if ( innerImg ) {
          $( clone ).draggable( "destroy" );
        }
      }
    }, false );
  }

  function selectableDragResize( el, withTooltip ) {
    var $el = $( el ),
        wasDraggedResized = false;

    $el.resizable({
      handles: "all",
      iframeFix: true,
      start: function( e, ui ) {
        wasDraggedResized = true;
        disablePE();
      },
      stop: enablePE
    });

    if ( withTooltip ) {
      $el.draggable({
        start: function( e, ui ) {
          wasDraggedResized = true;
          disablePE();
          document.body.appendChild( xy );
        },
        drag: function( e, ui ) {
          xy.style.left = e.pageX - $(window).scrollLeft() + "px";
          xy.style.top = e.pageY - $(window).scrollTop() + "px";
          $( ".ui-x-pos", xy ).text( ui.offset.left + "px" );
          $( ".ui-y-pos", xy ).text( ui.offset.top + "px" );
        },
        stop: function( e, ui ) {
          enablePE();
          document.body.removeChild( xy );
        }
      });
    } else {
      $el.draggable({
        start: function( e, ui ) {
          wasDraggedResized = true;
          disablePE();
        },
        stop: enablePE
      });
    }

    el.addEventListener( "mouseup", function( e ) {
      if ( wasDraggedResized ) {
        wasDraggedResized = false;
      } else {
        disableDraggable( el );
      }
    }, false );
  }

  // Textbox with draggable
  $( test1 ).draggable();

  // Textbox with resizable
  $( test2 ).draggable({
    iFrameFix: true,
    start: disablePE,
    stop: enablePE,
    handle: ".handle"
  })
  .resizable({
    iFrameFix: true,
    handles: "all",
    start: disablePE,
    stop: enablePE
  });

  test2.querySelector( "span" ).addEventListener( "mousedown", function( e ) {
    e.stopPropagation();
    disableDraggable( test2 );
  }, false );

  // Google maps
  $( test3 ).draggable({
    iFrameFix: true,
    start: disablePE,
    stop: enablePE
  }).resizable({
    handles: "all",
    iFrameFix: true,
    start: disablePE,
    stop: enablePE
  });
  test3.addEventListener( "dblclick", function( e ) {
    e.stopPropagation();
    disableDraggable( test3 );
  }, false );

  // Google maps with window
  $( test4 ).draggable({
    handle: ".window-handle",
    iFrameFix: true,
    start: disablePE,
    stop: enablePE
  });

  $( test4 ).resizable({
    handles: "all",
    iFrameFix: true,
    start: disablePE,
    stop: enablePE
  });

  // 4b - maps with handle
  $( test4b ).draggable({
    handle: ".handle",
    iFrameFix: true,
    start: disablePE,
    stop: enablePE
  });

  $( test4b ).resizable({
    handles: "all",
    iFrameFix: true,
    start: disablePE,
    stop: enablePE
  });


   // Google maps with selected state
  selectableDragResize( test5 );

  // Text with selected state
  selectableDragResize( test6 );

  // Image
  selectableDragResize( test7 );

  // Twitter
  selectableDragResize( test8, true );

  // Tabs
  $( ".tabs > li" ).each( function( i, el ) {
    var $tab = $( "#" + el.getAttribute( "data-tab" ) );
    el.addEventListener(  "click", function( e ) {
      $( "li.active" ).removeClass( "active" );
      $( el ).addClass( "active" );
      $( ".tab-container.on" ).removeClass( "on" );
      $tab.addClass( "on" );
    }, false );
  });

  // Store original sizes
  $( "img" ).load( function( e ) {
    this.setAttribute( "height", this.height );
    this.setAttribute( "width", this.width );
  });

  // Sliders
  $( ".image-size" ).slider({
    value: 50,
    slide: function( e, ui ) {
      $( e.target ).parent().parent().find( "img" ).each( function( i, el ) {
        el = $( el );
        el.css({
          height: el.attr( "height" ) * ( ui.value + 50 ) / 100 + "px",
          width: el.attr( "width" ) * ( ui.value + 50 ) / 100 + "px"
        });
      });
    }
  });


}, false );
