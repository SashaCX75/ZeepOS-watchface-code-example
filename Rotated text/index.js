
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
            const X = 454/2;                // X coordinate of the top left corner of the inscription
            const Y = 454/2;                // Y coordinate of the top left corner of the inscription. The point specified by the coordinates is on the top edge of the displayed symbols.
            const Angle = 60;               // The angle of the inscription, 0 degrees corresponds to the horizontal position of the inscription
            const CharSpace = 3;            // Space between characters
            const ImageWidht = 20;          // Width of character image
            const ImageHeight = 25;         // Height of character image
            const UnitsWidht = 50;          // Width of units image. The height of the units of measurement must be the same as the height of the images with numbers.
            const Aligment = 0;            // -1=Left aligment; 0=Centr aligment; 1=Right aligment.
            // *******************************************************************
            // auxiliary variables, for calculating the position of characters
            // *******************************************************************
            const Diagonal = Math.hypot(ImageWidht, ImageHeight);
            const DiagonalUnits = Math.hypot(UnitsWidht, ImageHeight);
            let WI_size = Diagonal * 2;                    // Widget hight and widht
            let WI_units_size = DiagonalUnits * 2;         // Widget units hight and widht
            // *******************************************************************
            let char_delta_x = Math.cos(toRadian(Angle)) * ( ImageWidht + CharSpace );  // Change the x-coordinate for each subsequent character.
		        let char_delta_y = Math.sin(toRadian(Angle)) * ( ImageWidht + CharSpace );  // Change the y-coordinate for each subsequent character.
            let StartPosX = X;
            let StartPosY = Y;
            // *******************************************************************
            // Auxiliary functions
            function toRadian(degree) {
                return degree * (Math.PI / 180);
            };
            // *******************************************************************

            for ( let i = 0; i < 5; i++ ){
              valueImg[i] = hmUI.createWidget(hmUI.widget.IMG, { });
            }
            
            units_img = hmUI.createWidget(hmUI.widget.IMG, { });
            // *******************************************************************
            // *******************************************************************

            
            
            const step = hmSensor.createSensor(hmSensor.id.STEP);
            step.addEventListener(hmSensor.event.CHANGE, function() { text_rotate() });  // Should update the text on the AOD screen if the data has changed
            
            
            function text_rotate() {  //  Get the parameter value and display it

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
                    StartPosX = X;
                    StartPosY = Y;
                    break;
                  case 0:
                    console.log('Centr aligment');
                    StartPosX = X - Math.cos(toRadian(Angle)) * ( ImageWidht*stepString.length/2 + CharSpace*(stepString.length-1)/2 );
                    StartPosY = Y - Math.sin(toRadian(Angle)) * ( ImageWidht*stepString.length/2 + CharSpace*(stepString.length-1)/2 );
                    break;
                  case 1:
                    console.log('Right aligment');
                    StartPosX = X - Math.cos(toRadian(Angle)) * ( ImageWidht*stepString.length + CharSpace*(stepString.length-1) );
                    StartPosY = Y - Math.sin(toRadian(Angle)) * ( ImageWidht*stepString.length + CharSpace*(stepString.length-1) );
                    break;
                }

                for (let char of stepString) {
                  const charCode = char.charCodeAt()-48;
                  if (charCode < 0) {
                    continue;
                  }
                  if (index >= 5) {
                    break;
                  }
                  if(charCode >= 0 && charCode < 10) valueImg[index].setProperty(hmUI.prop.MORE, {  
                    x: StartPosX - Diagonal + char_delta_x * index,
                    y: StartPosY - Diagonal + char_delta_y * index,
                    w: WI_size,
                    h: WI_size,
                    pos_x: Diagonal,
                    pos_y: Diagonal,
                    center_x: Diagonal,
                    center_y:  Diagonal,
                    angle: Angle,
                    src: ASCIIARRAY[charCode],
                    show_level: hmUI.show_level.ONLY_NORMAL,
                  });
                  index++;
                }
                if (index > 0)  // display units
                {
                  index--;
                  
                  units_img.setProperty(hmUI.prop.VISIBLE, true);
                  units_img.setProperty(hmUI.prop.MORE, {  // calculate the position of the unit image
                    x: StartPosX - DiagonalUnits + char_delta_x * stepString.length,
                    y: StartPosY - DiagonalUnits + char_delta_y * stepString.length,
                    w: WI_units_size,
                    h: WI_units_size,
                    pos_x: DiagonalUnits,
                    pos_y: DiagonalUnits,
                    center_x: DiagonalUnits,
                    center_y:  DiagonalUnits,
                    angle: Angle,
                    src: "steps.png",  // unit image
                    show_level: hmUI.show_level.ONLY_NORMAL,
                  });
                }
                else units_img.setProperty(hmUI.prop.VISIBLE, false);  // hide the units of measure if the data could not be retrieved
              }
              else  // in case of data error
              {
                console.log('error');
                switch(Aligment)
                {
                  case -1:
                    StartPosX = X;
                    StartPosY = Y;
                    break;
                  case 0:
                    StartPosX = X - Math.cos(toRadian(Angle)) * ( ImageWidht*0.5 );
                    StartPosY = Y - Math.sin(toRadian(Angle)) * ( ImageWidht*0.5 );
                    break;
                  case 1:
                    StartPosX = X - Math.cos(toRadian(Angle)) * ( ImageWidht );
                    StartPosY = Y - Math.sin(toRadian(Angle)) * ( ImageWidht );
                    break;
                }
                valueImg[0].setProperty(hmUI.prop.MORE, {  
                  x: StartPosX - Diagonal + char_delta_x * index,
                  y: StartPosY - Diagonal + char_delta_y * index,
                  w: WI_size,
                  h: WI_size,
                  pos_x: Diagonal,
                  pos_y: Diagonal,
                  center_x: Diagonal,
                  center_y:  Diagonal,
                  angle: Angle,
                  src: "error.png",
                  show_level: hmUI.show_level.ONLY_NORMAL,
                });
                units_img.setProperty(hmUI.prop.VISIBLE, false);  // hide the units of measure if the data could not be retrieved
              }
            };

            const widgetDelegate = hmUI.createWidget(hmUI.widget.WIDGET_DELEGATE, {
              resume_call: (function () {
                text_rotate();  // update text when screen turns on
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
  
