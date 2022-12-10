
/*
** Watch_Face_Editor tool
** watchface js version v1.0.1
** Copyright © CashaCX75. All Rights Reserved
** Based on code from Jel
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
    // let normal_analog_clock_time_pointer_second = ''


    //dynamic modify end

    //not required
    const logger = DeviceRuntimeCore.HmLogger.getLogger("yeguang");

    __$$module$$__.module = DeviceRuntimeCore.WatchFace({

      init_view() {

        //dynamic modify start


        normal_background_bg_img = hmUI.createWidget(hmUI.widget.IMG, {
          x: 0,
          y: 0,
          w: 466,
          h: 466,
          src: 'bg.png',
          show_level: hmUI.show_level.ONLY_NORMAL,
        });

        // normal_analog_clock_time_pointer_second = hmUI.createWidget(hmUI.widget.TIME_POINTER, {
        //   second_path: 'pointer.png',
        //   second_centerX: 233,
        //   second_centerY: 233,
        //   second_posX: 5,
        //   second_posY: 227,
        //   show_level: hmUI.show_level.ONLY_NORMAL,
        // });

        // Remove your original section "normal_analog_clock_time_pointer_second = hmUI.createWidget(hmUI.widget.TIME_POINTER"
        // take values from above. The 8 and 223 frome above, too.
        // set PNG name here

        // SMOOTH SECONDS Definition
        let second_centerX = 233;
        let second_centerY = 233;
        let second_posX = 5;
        let second_posY = 227;
        let second_path = "pointer.png";
        // ----------------------------
        let sec_pointer;
        let clock_timer;
        let animAngle = 0;
        let animDelay = 0;
        const animFps = 12;                             // Frames per second 
        const animRepeat = 1000 / animFps;              // then execute every <animRepeat>ms
        const deviceInfo = hmSetting.getDeviceInfo();   // Needed for automatic screen size detection
        // SMOOTH SECONDS Definition End

        sec_pointer = hmUI.createWidget(hmUI.widget.IMG, {
          x: 0,
          y: 0,
          w: deviceInfo.width,
          h: deviceInfo.height,
          pos_x: second_centerX - second_posX,
          pos_y: second_centerY - second_posY,
          center_x: second_centerX,
          center_y: second_centerY,
          src: second_path,
          angle: 0,
          show_level: hmUI.show_level.ONLY_NORMAL,
        });

        const now = hmSensor.createSensor(hmSensor.id.TIME);

        const vDelegate = hmUI.createWidget(hmUI.widget.WIDGET_DELEGATE, {
          resume_call: (function () {
            console.log('ui resume');

            if (!clock_timer) {
              console.log('createTimer');
              clock_timer = timer.createTimer(animDelay, animRepeat, (function (option) {
                animAngle = (now.second * 6) + (((now.utc % 1000) / 1000) * 6);
                sec_pointer.setProperty(hmUI.prop.ANGLE, animAngle);
              }));
            }
          }),
          pause_call: (function () {
            console.log('ui pause');
            if (clock_timer) {
              timer.stopTimer(clock_timer);
              clock_timer = undefined;
              console.log('stopTimer');
            }
          }),

        });
        // End Smooth Seconds




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
