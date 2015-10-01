( function ( $ ) {
    var $content    = $( '#content' ),
        $active     = null,
        $details    = null;

    function load( href, $this ) {
        $.ajax( {
            url:        href.replace( '!', '' ),
            dataType:   'html',
            method:     'GET'
        }).done( function( data, textStatus, jqXHR ) {
                var $newContent  = $( data ).find( '#content');
                $content.html( $newContent.html() );

                if( $active !== null ) {
                    $active.removeClass( 'active' );
                    $details.detach();
                }

                $active = $this.addClass( 'active' );
                $details = $( '<div class="details row visible-xs">' ).html( $newContent.html() );
                $active.append( $details );

                //scroll to postion based on screen resolution
                if( $( window ).width() > 767 ) {
                    $( 'html, body').animate({ scrollTop: '0px' });

                } else {
                    $( 'html, body').animate({ scrollTop: $this.offset().top });
                }

            })
            .fail( function( jqXHR, textStatus, errorThrown ) {
                //TODO: show an error
                $content.html( '<h1>ERROR</h1><p>Unable to load the item specified.</p>' );
            });
    };

    $( '.media' ).on( 'click', function ( e ) {
        var $this   = $( this ),
            href    = $this.attr( 'data-href' );

        if( href !== document.location.hash.replace( '#' ) ) //different hash, change has to trigger load
            document.location.hash = href;
    });

    //Load from hash with back/forward button support
    $( window )
        .on( 'hashchange', function( e ) {
            var $hashlinked = $( '.media[data-href="' + document.location.hash.replace( '#', '' ) + '"]' );
            $hashlinked.length > 0 ? load( $hashlinked.attr( 'data-href' ), $hashlinked ) : null;
        })
        .trigger( 'hashchange' ); //trigger to init for existing hash

})( jQuery );
