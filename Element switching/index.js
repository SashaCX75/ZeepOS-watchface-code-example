
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
        let normal_heart_rate_icon_img = ''
        let normal_heart_rate_text_text_img = ''
        let normal_calorie_icon_img = ''
        let normal_calorie_current_text_img = ''
        let normal_step_icon_img = ''
        let normal_step_current_text_img = ''

        let element_index = 1;  // Selected element index
        let element_count = 3;  // Number of elements


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
              src: 'bg.png',
              show_level: hmUI.show_level.ONLY_NORMAL,
            });

            normal_heart_rate_icon_img = hmUI.createWidget(hmUI.widget.IMG, {
              x: 225,
              y: 239,
              src: 'heart.png',
              show_level: hmUI.show_level.ONLY_NORMAL,
            });

            normal_heart_rate_text_text_img = hmUI.createWidget(hmUI.widget.TEXT_IMG, {
              x: 220,
              y: 200,
              font_array: ["number_0.png","number_1.png","number_2.png","number_3.png","number_4.png","number_5.png","number_6.png","number_7.png","number_8.png","number_9.png"],
              padding: false,
              h_space: 0,
              align_h: hmUI.align.LEFT,
              type: hmUI.data_type.HEART,
              show_level: hmUI.show_level.ONLY_NORMAL,
            });

            normal_calorie_icon_img = hmUI.createWidget(hmUI.widget.IMG, {
              x: 225,
              y: 240,
              src: 'calories.png',
              show_level: hmUI.show_level.ONLY_NORMAL,
            });
            normal_calorie_icon_img.setProperty(hmUI.prop.VISIBLE, false);  // Disable element display

            normal_calorie_current_text_img = hmUI.createWidget(hmUI.widget.TEXT_IMG, {
              x: 220,
              y: 200,
              font_array: ["number_0.png","number_1.png","number_2.png","number_3.png","number_4.png","number_5.png","number_6.png","number_7.png","number_8.png","number_9.png"],
              padding: false,
              h_space: 0,
              align_h: hmUI.align.LEFT,
              type: hmUI.data_type.CAL,
              show_level: hmUI.show_level.ONLY_NORMAL,
            });
            normal_calorie_current_text_img.setProperty(hmUI.prop.VISIBLE, false);  // Disable element display

            normal_step_icon_img = hmUI.createWidget(hmUI.widget.IMG, {
              x: 225,
              y: 240,
              src: 'steps.png',
              show_level: hmUI.show_level.ONLY_NORMAL,
            });
            normal_step_icon_img.setProperty(hmUI.prop.VISIBLE, false);  // Disable element display

            normal_step_current_text_img = hmUI.createWidget(hmUI.widget.TEXT_IMG, {
              x: 201,
              y: 200,
              font_array: ["number_0.png","number_1.png","number_2.png","number_3.png","number_4.png","number_5.png","number_6.png","number_7.png","number_8.png","number_9.png"],
              padding: false,
              h_space: 0,
              align_h: hmUI.align.LEFT,
              type: hmUI.data_type.STEP,
              show_level: hmUI.show_level.ONLY_NORMAL,
            });
            normal_step_current_text_img.setProperty(hmUI.prop.VISIBLE, false);  // Disable element display
            
            function click_btn() {  // Function to enable and disable the visibility of elements
              element_index++;
              if(element_index > element_count) element_index = 1;

              normal_heart_rate_icon_img.setProperty(hmUI.prop.VISIBLE, element_index == 1);
              normal_heart_rate_text_text_img.setProperty(hmUI.prop.VISIBLE, element_index == 1);

              normal_calorie_icon_img.setProperty(hmUI.prop.VISIBLE, element_index == 2);
              normal_calorie_current_text_img.setProperty(hmUI.prop.VISIBLE, element_index == 2);

              normal_step_icon_img.setProperty(hmUI.prop.VISIBLE, element_index == 3);
              normal_step_current_text_img.setProperty(hmUI.prop.VISIBLE, element_index == 3);

              // if (element_index == 1) {
              //   hmUI.showToast({text: 'Heart Rete'});
              // };
              // if (element_index == 2) {
              //   hmUI.showToast({text: 'Calories'});
              // };
              // if (element_index == 3) {
              //   hmUI.showToast({text: 'Steps'});
              // };
            };


            // Button to switch elements. This block should be after all blocks with display elements.
            hmUI.createWidget(hmUI.widget.BUTTON, {
              x: 180,  // x coordinate of the button
              y: 180,  // y coordinate of the button
              text: '',
              w: 120,  // button width
              h: 120,  // button height
              normal_src: 'transparent_img.png',  // transparent image
              press_src: 'transparent_img.png',  // transparent image
              show_level: hmUI.show_level.ONLY_NORMAL,
              click_func: () => {
                click_btn();
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
  
