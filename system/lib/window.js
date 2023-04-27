$(document).ready(function() {
    let zIndexCounter = 1;

    const createIFrameWindow = (config) => {
  const {
    iframeSrc,
    defaultWidth,
    defaultHeight,
    windowTitle
  } = config;
  const $window = $(`
    <div class="appwindow" id="appwindow-${config.id}" style="width: ${defaultWidth}px; height: ${defaultHeight}px; top: calc(50% - ${defaultHeight/2}px); left: calc(50% - ${defaultWidth/2}px)">
      <div class="toolbar">
        <h4 class="window-title">${windowTitle}</h4>
        <div>
          <button class="minimize-btn">-</button>
          <button class="maximize-btn">+</button>
          <button class="close-btn">x</button>
        </div>
      </div>
      <iframe src="${iframeSrc}" class="appframe" frameborder="0" style="width: 100%; height: calc(100% - 28px);"></iframe>
    </div>
  `);
      const $closeButton = $window.find('.close-btn');
  $closeButton.on('click', function() {
    $window.remove();
  });
        const $iframe = $window.find('iframe');
        $iframe.on('load', function() {
            const iframeWindow = this.contentWindow;
            const handleMouseDown = function(event) {
                event.stopPropagation();
                iframeWindow.removeEventListener('mousedown', handleMouseDown);
            };
            iframeWindow.addEventListener('mousedown', handleMouseDown);

            // Remove the border around the iFrame when a directory is linked
            this.style.border = 'none';
        });


        $('body').append($window);

        $window.draggable({
            handle: '.toolbar, iframe', // Added 'iframe' to the handle
            start: function() {
                $window.append('<div class="iframe-overlay" style="position: absolute; top: 0; left: 0; width: 100%; height: calc(100% - 28px); background-color: transparent;"></div>');
            },
            stop: function() {
                $window.find('.iframe-overlay').remove();
            }
        });

        $window.resizable({
            handles: 'all', // Added this line to enable resizing from all edges and corners
            start: function() {
                $window.append('<div class="iframe-overlay" style="position: absolute; top: 0; left: 0; width: 100%; height: calc(100% - 28px); background-color: transparent;"></div>');
            },
            stop: function() {
                $window.find('.iframe-overlay').remove();
            }
        });
        $window.css('z-index', zIndexCounter++);
        return $window;
    };


    const createButton = (buttonConfig) => {
        const buttonText = buttonConfig.imgSrc ? '' : buttonConfig.buttonText;
        const $button = $(`<button id="${buttonConfig.id}" class="buttondefault ${buttonConfig.id}">
                          ${buttonConfig.imgSrc ? `<img src="${buttonConfig.imgSrc}" alt="" style="width: 20px; height: 20px;">` : ''}
                          ${buttonText}
                        </button>`);
        $button.on('click', function() {
            const $existingWindow = $(`#appwindow-${buttonConfig.id}`);
            if ($existingWindow.length) {
                $existingWindow.show();
            } else {
                createIFrameWindow(buttonConfig);
            }
        });
        return $button;
    };




    config.buttons.forEach(buttonConfig => {
        const $button = createButton(buttonConfig);
        $('#apps').append($button);
    });

    $('body').on('click', '.minimize-btn', function() {
        $(this).closest('.appwindow').hide();
    });

    $('body').on('click', '.maximize-btn', function() {
        const $window = $(this).closest('.appwindow');
        const isMaximized = $window.hasClass('maximized');

        if (isMaximized) {
            $window.removeClass('maximized');
            $window.css({
                top: $window.data('original-top'),
                left: $window.data('original-left'),
                width: $window.data('original-width'),
                height: $window.data('original-height'),
            });
        } else {
            $window.addClass('maximized');
            $window.data({
                'original-top': $window.css('top'),
                'original-left': $window.css('left'),
                'original-width': $window.css('width'),
                'original-height': $window.css('height'),
            });
            $window.css({
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
            });
        }
    });



    $('body').on('mousedown', '.appwindow', function() {
    $(this).css('z-index', zIndexCounter++);
});

  
  


    // Cover the iFrame with the overlay during dragging
    $('body').on('dragstart', '.appwindow', function() {
        const $window = $(this);
        $window.append('<div class="iframe-overlay" style="position: absolute; top: 0; left: 0; width: 100%; height: calc(100% - 28px); background-color: transparent;"></div>');
    });

    $('body').on('dragstop', '.appwindow', function() {
        const $window = $(this);
        $window.find('.iframe-overlay').remove();
    });
});