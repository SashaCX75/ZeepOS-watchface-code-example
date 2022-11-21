
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

        
        let normal_background_bg_img = ''

        // Only one instance of the VIBRATE sensor can be created, not more than one.
        const vibrate = hmSensor.createSensor(hmSensor.id.VIBRATE);


        //dynamic modify end

        //not required
        const logger = DeviceRuntimeCore.HmLogger.getLogger("yeguang");

        __$$module$$__.module = DeviceRuntimeCore.WatchFace({

          init_view() {

            //dynamic modify start
                    
            
            normal_background_bg_img = hmUI.createWidget(hmUI.widget.IMG, {
              x: 0,
              y: 0,
              w: 480,
              h: 480,
              src: 'Image_1.png',
              show_level: hmUI.show_level.ONLY_NORMAL,
            });


            hmUI.createWidget(hmUI.widget.BUTTON, {
              x: 150,  // x coordinate of the button
              y: 100,  // y coordinate of the button
              text: '',
              w: 180,  // button width
              h: 80,  // button height
              radius: 20,  // Rounded corners when using color as button background.
              normal_color: 0xff0000,  // The color of normal state background. Need to be used with press_color.
              press_color: 0x000000,  // 	The color of background when pressed. Need to be used with normal_color.
              show_level: hmUI.show_level.ONLY_NORMAL,
              click_func: () => {
                click_Vibrate_1();
              }
            });

            hmUI.createWidget(hmUI.widget.BUTTON, {
              x: 150,  // x coordinate of the button
              y: 200,  // y coordinate of the button
              text: '',
              w: 180,  // button width
              h: 80,  // button height
              radius: 20,  // Rounded corners when using color as button background.
              normal_color: 0x00ff00,  // The color of normal state background. Need to be used with press_color.
              press_color: 0x000000,  // 	The color of background when pressed. Need to be used with normal_color.
              show_level: hmUI.show_level.ONLY_NORMAL,
              click_func: () => {
                click_Vibrate_2();
              }
            });

            hmUI.createWidget(hmUI.widget.BUTTON, {
              x: 150,  // x coordinate of the button
              y: 300,  // y coordinate of the button
              text: '',
              w: 180,  // button width
              h: 80,  // button height
              radius: 20,  // Rounded corners when using color as button background.
              normal_color: 0x0000ff,  // The color of normal state background. Need to be used with press_color.
              press_color: 0x000000,  // 	The color of background when pressed. Need to be used with normal_color.
              show_level: hmUI.show_level.ONLY_NORMAL,
              click_func: () => {
                click_Vibrate_3();
              }
            });
            
            function click_Vibrate_1() {
              vibrate.stop()  // you must call stop after the vibration is finished, otherwise the next call to start will not vibrate
              vibrate.scene = 1 // vibration scene setting
              vibrate.start()
            }
            
            function click_Vibrate_2() {
              vibrate.stop()  // you must call stop after the vibration is finished, otherwise the next call to start will not vibrate
              vibrate.scene = 9 // vibration scene setting
              vibrate.start()
            }
            
            function click_Vibrate_3() {
              vibrate.stop()  // you must call stop after the vibration is finished, otherwise the next call to start will not vibrate
              vibrate.scene = 25 // vibration scene setting
              vibrate.start()
            }


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

          onDestroy() {
            console.log('index page.js on destory invoke')
            vibrate && vibrate.stop()  // recommended in the official documentation
          },
        });

      })()
    } catch (e) {
      console.log(e)
    }
  
