
    /*
    ** Watch_Face_Editor tool
    ** watchface js version v1.0.1
    ** Copyright © CashaCX75. All Rights Reserved
    ** Based on code from chen1092
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
        let normal_analog_clock_time_pointer_second = ''


        //dynamic modify end

        //not required
        const logger = DeviceRuntimeCore.HmLogger.getLogger("yeguang");

        __$$module$$__.module = DeviceRuntimeCore.WatchFace({

          init_view() {

            //dynamic modify start
                    
            
            normal_background_bg_img = hmUI.createWidget(hmUI.widget.IMG, {
              x: 0,
              y: 0,
              w: 454,
              h: 454,
              src: 'bg.png',
              show_level: hmUI.show_level.ONLY_NORMAL,
            });

            // normal_analog_clock_time_pointer_second = hmUI.createWidget(hmUI.widget.TIME_POINTER, {
            //   second_path: 'pointer.png',
            //   second_centerX: 227,
            //   second_centerY: 227,
            //   second_posX: 5,
            //   second_posY: 227,
            //   show_level: hmUI.show_level.ONLY_NORMAL,
            // });

            // Remove your original section "normal_analog_clock_time_pointer_second = hmUI.createWidget(hmUI.widget.TIME_POINTER"
            // take values from above. The 5 and 227 frome above, too.
            // set PNG name here

            // SMOOTH SECONDS Definition
            let second_centerX = 227;
            let second_centerY = 227;
            let second_posX = 5;
            let second_posY = 227;
            let second_path = "pointer.png";
            // ----------------------------
            let lastTime = 0;
            let animTimer;
            const animDuration = 5000;
            const animFps = 25; // 8 for 28800VPH, 10 for 36000VPH, 25 for smooth motion
            const deviceInfo = hmSetting.getDeviceInfo();   // Needed for automatic screen size detection
            
            // Smooth Seconds
            normal_analog_clock_time_pointer_second = hmUI.createWidget(hmUI.widget.IMG, {
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

            function startSecAnim(sec) {
              const secAnim = {
                anim_rate: 'linear',
                anim_duration: animDuration,
                anim_from: sec,
                anim_to: sec + animDuration * 6 / 1000,
                repeat_count: 1,
                anim_fps: animFps,
                anim_key: "angle",
                anim_status: 1,
              }
              normal_analog_clock_time_pointer_second.setProperty(hmUI.prop.ANIM, secAnim);
            }

            const now = hmSensor.createSensor(hmSensor.id.TIME);

            let widgetDelegate = hmUI.createWidget(hmUI.widget.WIDGET_DELEGATE, {
              resume_call: (function () {  // when the screen turns on, create a timer to update the animation
                console.log('ui resume');
      
                const screenType = hmSetting.getScreenType();
                if (screenType != hmSetting.screen_type.WATCHFACE) return;  // if not the main screen of the dial, then do nothing
                if (animTimer) return;  // if the timer is already running, then do nothing
      
                let duration = 0;
                const diffTime = now.utc - lastTime;
                if (diffTime < animDuration) {
                  duration = animDuration - diffTime;  // we calculate the timer start delay, depending on the time of its last start (so that there is no overlap of two animations)
                }
      
                console.log('createTimer');
                animTimer = timer.createTimer(duration, animDuration, (function (option) {
                  lastTime = now.utc;
                  let sec = (now.second * 6) + (((now.utc % 1000) / 1000) * 6);  // we calculate the angle of the second hand depending on the seconds and milliseconds.
                  startSecAnim(sec);
                }));
              }),
              pause_call: (function () {  // when the screen turns off, delete the timer
                console.log('ui pause');
                if (animTimer) {
                  timer.stopTimer(animTimer);
                  animTimer = undefined;
                }
              }),
            });
            // SMOOTH SECONDS Definition End

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
  
