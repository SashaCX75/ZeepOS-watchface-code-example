
    /*
    ** Watch_Face_Editor tool
    ** watchface js version v1.0.1
    ** Copyright © CashaCX75. All Rights Reserved
    */

    try {

      (() => {

        var __$$app$$__ = __$$hmAppManager$$__.currentApp;
        var __$$module$$__ = __$$app$$__.current;
        //drink is a name,can modify
        var h = new DeviceRuntimeCore.WidgetFactory(new DeviceRuntimeCore.HmDomApi(__$$app$$__, __$$module$$__), 'drink');

        'use strict';

        //dynamic modify start

        
        let img = ''  // block name with image

        let prefix_img = 'Image_'  // prefix image (name without sequence number)
        let img_index = 1  // image number
        let img_count = 4  // number of images


        //dynamic modify end

        //not required
        const logger = DeviceRuntimeCore.HmLogger.getLogger("yeguang");

        __$$module$$__.module = DeviceRuntimeCore.WatchFace({

          init_view() {

            //dynamic modify start
                    
            
            img = hmUI.createWidget(hmUI.widget.IMG, {
              x: 0,
              y: 0,
              w: 480,
              h: 480,
              src: prefix_img + parseInt(img_index) + '.png',
              show_level: hmUI.show_level.ONLY_NORMAL,
            });


            // Button to switch images. This block should be after all blocks with display elements.
            hmUI.createWidget(hmUI.widget.BUTTON, {
              x: 100,  // x coordinate of the button
              y: 100,  // y coordinate of the button
              text: '',
              w: 280,  // button width
              h: 280,  // button height
              normal_src: 'transparent_img.png',  // transparent image
              press_src: 'transparent_img.png',  // transparent image
              show_level: hmUI.show_level.ONLY_NORMAL,
              click_func: () => {
                img_index++;
                if(img_index > img_count) img_index = 1;
                hmUI.showToast({text: 'Background ' + parseInt(img_index) });  // Remove if you do not want to display a message with the number of the selected image
                img.setProperty(hmUI.prop.SRC, prefix_img + parseInt(img_index) + '.png');
              }
            });

            //dynamic modify end
          },

          onInit() {
            console.log('index page.js on init invoke')

            this.init_view()

          },

          onReady() {
            console.log('index page.js on ready invoke')
          },

          onShow() {
            console.log('index page.js on show invoke')
          },

          onHide() {
            console.log('index page.js on hide invoke')
          },

          onDestory() {
            console.log('index page.js on destory invoke')
          },
        });

      })()
    } catch (e) {
      console.log(e)
    }
  
