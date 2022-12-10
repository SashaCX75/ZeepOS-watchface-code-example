
    /*
    ** Watch_Face_Editor tool
    ** watchface js version v1.0.1
    ** Copyright © CashaCX75. All Rights Reserved
    ** With the assistance of Jel
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

            // required variables
            const valueImg = new Array(5);  // maximum display data length 5 characters (99999)
            const ASCIIARRAY = new Array(10);
            for (let i = 0; i < 10; i++) {
              ASCIIARRAY[i] = "number_" + i + ".png";  // set of images with numbers
            }
            let units_img = ''
            // *******************************************************************
            // initial variables, affect the position and display of data
            // *******************************************************************
            const Circle_Radius = 150;        // Circle Radius to display text
            const Circle_x = 454/2;           // Circle center x relative to display
            const Circle_y = 454/2;           // Circle center y relative to display
            const Angle = 210;                // Angle of first character, 0 degrees corresponds to the direction at 12 o'clock
            const CharSpaceAngle = 1;         // Angle between characters
            const ImageWidht = 20;            // Width of character image
            const ImageHeight = 25;           // Height of character image
            const UnitsWidht = 50;            // Width of units image. The height of the units of measurement must be the same as the height of the images with numbers.
            const Vertical_Alignment = 0;     // Character vertical alignment relative to the circle: -1 = top, 0 = center, 1 = bottom
            const ReverseDirection = true;    // Affects the direction of the text. It is advisable to use true if the text is located at the bottom of the circle
            const Aligment = 1;               // -1=Left aligment; 0=Centr aligment; 1=Right aligment.
            // *******************************************************************
            // auxiliary variables, for calculating the position of characters
            // *******************************************************************
            let WI_x = Circle_x - Circle_Radius - ImageHeight;        // Widget X position relative to display
            let WI_y = Circle_y - Circle_Radius - ImageHeight;        // Widget Y position relative to display
            let WI_h = Circle_Radius*2 + ImageHeight * 2;             // Widget hight
            let WI_w = Circle_Radius*2 + ImageHeight * 2;             // Widget widht
            let WI_center = WI_h/2;
            let startAngle = Angle;
            let imagePos_x = WI_center - ImageWidht/2;
            let imagePos_y = WI_center - Circle_Radius - (ImageHeight + Vertical_Alignment*ImageHeight)/2;
            if (ReverseDirection) imagePos_y = WI_center + Circle_Radius - ImageHeight + (ImageHeight - Vertical_Alignment*ImageHeight)/2;

            let WI_units_x = Circle_x - Circle_Radius - ImageHeight - ImageWidht/2;
            let WI_units_y = Circle_y - Circle_Radius - ImageHeight - ImageWidht/2;
            let WI_units_h = Circle_Radius*2 + ImageHeight * 2 + ImageWidht;
            let WI_units_w = Circle_Radius*2 + ImageHeight * 2 + ImageWidht; 
            let WI_units_center = WI_units_h/2;
            let imagePos_units_x = WI_units_center - UnitsWidht/2;
            let imagePos_units_y = WI_units_center - Circle_Radius - (ImageHeight + Vertical_Alignment*ImageHeight)/2;
            if (ReverseDirection) imagePos_units_y = WI_units_center + Circle_Radius - ImageHeight + (ImageHeight - Vertical_Alignment*ImageHeight)/2;
            // *******************************************************************
            // Auxiliary functions
            function toDegree (radian) {
                return radian * (180 / Math.PI);
            }
            // *******************************************************************

            let charAngle=(toDegree(Math.atan2(ImageWidht/2, Circle_Radius)));
            let unitAngle=(toDegree(Math.atan2(UnitsWidht/2, Circle_Radius)));

            for ( let i = 0; i < 5; i++ ){
              valueImg[i] = hmUI.createWidget(hmUI.widget.IMG, { });
            }
            units_img = hmUI.createWidget(hmUI.widget.IMG, { });
            // *******************************************************************
            // *******************************************************************

            
            const step = hmSensor.createSensor(hmSensor.id.STEP);
            step.addEventListener(hmSensor.event.CHANGE, function() { text_circle() });  // Should update the text on the AOD screen if the data has changed

            function text_circle() {  //  Get the parameter value and display it

              console.log('update STEP');
              
              let stepCurrent=step.current;
              let stepString = String(stepCurrent);
              let index = 0;
              valueImg[0].setProperty(hmUI.prop.SRC, "error.png"); // Image displayed when there is no data. Without this string, "0" will be displayed.
              for (var i = 1; i < 5; i++) {  // clear all symbols
                valueImg[i].setProperty(hmUI.prop.SRC, 'transparent.png');
              }             
              if (isFinite(stepCurrent) && stepString.length>0 && stepString.length<6) {  // display data if it was possible to get it
                switch(Aligment)
                {
                  case -1:
                    console.log('Left aligment');
                    startAngle = Angle;
                    break;
                  case 0:
                    console.log('Centr aligment');
                    startAngle = Angle - charAngle*(stepString.length-1) - CharSpaceAngle*(stepString.length-1)/2;
                    if (ReverseDirection) startAngle = Angle + charAngle*(stepString.length-1) + CharSpaceAngle*(stepString.length-1)/2;
                    break;
                  case 1:
                    console.log('Right aligment');
                    startAngle = Angle - 2*charAngle*(stepString.length-1) - CharSpaceAngle*(stepString.length-1);
                    if (ReverseDirection) startAngle = Angle + 2*charAngle*(stepString.length-1) + CharSpaceAngle*(stepString.length-1);
                    break;
                }
                if (ReverseDirection) startAngle = startAngle - 180;

                for (let char of stepString) {
                  const charCode = char.charCodeAt()-48;
                  if (charCode < 0) {
                    continue;
                  }
                  if (index >= 5) {
                    break;
                  }
                  let char_Angle = startAngle + 2*charAngle*index + CharSpaceAngle*index;
                  if (ReverseDirection) char_Angle = startAngle - 2*charAngle*index - CharSpaceAngle*index;
                  console.log("char_Angle: {0}", char_Angle);

                  if(charCode >= 0 && charCode < 10) valueImg[index].setProperty(hmUI.prop.MORE, { 
                    x: WI_x,
                    y: WI_y,
                    w: WI_w,
                    h: WI_h,
                    pos_x: imagePos_x,
                    pos_y: imagePos_y,
                    center_x: WI_center,
                    center_y:  WI_center,
                    angle: char_Angle,
                    src: ASCIIARRAY[charCode],
                    show_level: hmUI.show_level.ONLY_NORMAL,
                  });
                  index++;
                }
                if (index > 0)  // display units
                {
                  index--;
                  let units_Angle = startAngle + 2*charAngle*(stepString.length-0.5) + unitAngle + CharSpaceAngle*stepString.length;
                  if (ReverseDirection) units_Angle = startAngle - 2*charAngle*(stepString.length-0.5) - unitAngle  - CharSpaceAngle*stepString.length;
                  units_img.setProperty(hmUI.prop.VISIBLE, true);
                  units_img.setProperty(hmUI.prop.MORE, {  // pre-calculate the position of the unit image
                    x: WI_units_x,
                    y: WI_units_y,
                    w: WI_units_w,
                    h: WI_units_h,
                    pos_x: imagePos_units_x,
                    pos_y: imagePos_units_y,
                    center_x: WI_units_center,
                    center_y:  WI_units_center,
                    angle: units_Angle,
                    src: "steps.png",  // unit image
                    show_level: hmUI.show_level.ONLY_NORMAL,
                  });
                }
                else units_img.setProperty(hmUI.prop.VISIBLE, false);  // hide the units of measure if the data could not be retrieved
              }
              else  // in case of data error
              {
                console.log('error');
                startAngle = Angle
                if (ReverseDirection) startAngle = startAngle - 180;
                valueImg[0].setProperty(hmUI.prop.MORE, {  
                  x: WI_x,
                  y: WI_y,
                  w: WI_w,
                  h: WI_h,
                  pos_x: imagePos_x,
                  pos_y: imagePos_y,
                  center_x: WI_center,
                  center_y:  WI_center,
                  angle: startAngle,
                  src: "error.png",
                  show_level: hmUI.show_level.ONLY_NORMAL,
                });
                units_img.setProperty(hmUI.prop.VISIBLE, false);  // hide the units of measure if the data could not be retrieved
              }
            };
            

            const widgetDelegate = hmUI.createWidget(hmUI.widget.WIDGET_DELEGATE, {
              resume_call: (function () {
                text_circle();  // update text when screen turns on
              }),
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
  
