"use strict";

/**
 * @property {object[]}     list
 * @property {string}       list[].src                      Path to image
 * @property {string}       list[].groupName                Group name identifier
 * @property {number}       [list[].boundsBottom=undefined] Explicit image bottom bound
 * @property {number}       [list[].boundsTop=undefined]    Explicit image top bound
 * @property {number}       [list[].boundsLeft=undefined]   Explicit image left bound
 * @property {number}       [list[].boundsRight=undefined]  Explicit image right bound
 * @property {boolean}      [list[].required=false]         Should application start wait for this asset
 * @property {string}       [list[].name=undefined]         Name identifier
 */
var list = [

    {src:"assets/images/various/NokiaLumia1520_05_Web.png", groupName:"various", name:"phone", required:true,
        screenTop:80, screenBottom:814, screenLeft:30, screenRight:442},
    {src:"assets/images/various/NokiaLumia1520_05_Web_reflectionMask.png", groupName:"various",
        name:"reflectionMask", required:true},
    {src:"assets/images/various/app_bg.jpg", groupName:"various", name:"applicationBackground", required:true},

    {src:"assets/images/background/_MG_0248.jpg", groupName:"background", boundsBottom:641},
    {src:"assets/images/background/_MG_0254.jpg", groupName:"background", boundsBottom:679},
    {src:"assets/images/background/_MG_0256.jpg", groupName:"background", boundsBottom:655},
    // {src:"assets/images/background/_MG_0263.jpg", groupName:"background", boundsBottom:635},
    {src:"assets/images/background/_MG_0264.jpg", groupName:"background", boundsBottom:650},
    {src:"assets/images/background/_MG_0265.jpg", groupName:"background", boundsBottom:650},
    // {src:"assets/images/background/_MG_0266.jpg", groupName:"background", boundsBottom:635},
    {src:"assets/images/background/_MG_0267.jpg", groupName:"background", boundsBottom:650},
    {src:"assets/images/background/_MG_0268.jpg", groupName:"background", boundsBottom:690},
    {src:"assets/images/background/_MG_0269.jpg", groupName:"background", boundsBottom:649},
    {src:"assets/images/background/_MG_0271.jpg", groupName:"background", boundsBottom:671},
    {src:"assets/images/background/_MG_0272.jpg", groupName:"background", boundsBottom:664},
    {src:"assets/images/background/_MG_0273.jpg", groupName:"background", boundsBottom:642},
    {src:"assets/images/background/_MG_0274.jpg", groupName:"background", boundsBottom:635},
    {src:"assets/images/background/_MG_0275.jpg", groupName:"background", boundsBottom:686},
    {src:"assets/images/background/_MG_0276.jpg", groupName:"background", boundsBottom:648},
    {src:"assets/images/background/_MG_0277.jpg", groupName:"background", boundsBottom:643},

    {src:"assets/images/chin/00.png", groupName:"chin", boundsBottom:285},
    {src:"assets/images/chin/01.png", groupName:"chin", boundsBottom:285},
    {src:"assets/images/chin/02.png", groupName:"chin", boundsBottom:290},
    {src:"assets/images/chin/03.png", groupName:"chin", boundsBottom:315},
    {src:"assets/images/chin/04.png", groupName:"chin", boundsBottom:326},
    {src:"assets/images/chin/05.png", groupName:"chin", boundsBottom:357},
    {src:"assets/images/chin/06.png", groupName:"chin", boundsBottom:305},
    {src:"assets/images/chin/07.png", groupName:"chin", boundsBottom:300},
    {src:"assets/images/chin/08.png", groupName:"chin", boundsBottom:353},
    {src:"assets/images/chin/09.png", groupName:"chin", boundsBottom:337},
    {src:"assets/images/chin/10.png", groupName:"chin", boundsBottom:345},
    {src:"assets/images/chin/11.png", groupName:"chin", boundsBottom:328},
    {src:"assets/images/chin/12.png", groupName:"chin", boundsBottom:277},
    {src:"assets/images/chin/14.png", groupName:"chin", boundsBottom:282},
    {src:"assets/images/chin/15.png", groupName:"chin", boundsBottom:315},
    {src:"assets/images/chin/16.png", groupName:"chin", boundsBottom:313},
    {src:"assets/images/chin/17.png", groupName:"chin", boundsBottom:320},
    {src:"assets/images/chin/18.png", groupName:"chin", boundsBottom:360},
    {src:"assets/images/chin/19.png", groupName:"chin", boundsBottom:345},
    {src:"assets/images/chin/20.png", groupName:"chin", boundsBottom:290},
    {src:"assets/images/chin/21.png", groupName:"chin", boundsBottom:300},
    {src:"assets/images/chin/22.png", groupName:"chin", boundsBottom:318},
    {src:"assets/images/chin/23.png", groupName:"chin", boundsBottom:286},
    {src:"assets/images/chin/24.png", groupName:"chin", boundsBottom:344},
    {src:"assets/images/chin/25.png", groupName:"chin", boundsBottom:343},
    {src:"assets/images/chin/26.png", groupName:"chin", boundsBottom:340},
    {src:"assets/images/chin/27.png", groupName:"chin", boundsBottom:308},
    {src:"assets/images/chin/28.png", groupName:"chin", boundsBottom:279},
    {src:"assets/images/chin/29.png", groupName:"chin", boundsBottom:317},
    {src:"assets/images/chin/31.png", groupName:"chin", boundsBottom:351},
    {src:"assets/images/chin/32.png", groupName:"chin", boundsBottom:294},
    {src:"assets/images/chin/33.png", groupName:"chin", boundsBottom:281},
    {src:"assets/images/chin/34.png", groupName:"chin", boundsBottom:278},
    {src:"assets/images/chin/35.png", groupName:"chin", boundsBottom:289},
    {src:"assets/images/chin/38.png", groupName:"chin", boundsBottom:285},
    {src:"assets/images/chin/39.png", groupName:"chin", boundsBottom:311},
    {src:"assets/images/chin/40.png", groupName:"chin", boundsBottom:293},
    {src:"assets/images/chin/41.png", groupName:"chin", boundsBottom:354},
    {src:"assets/images/chin/42.png", groupName:"chin", boundsBottom:325},
    {src:"assets/images/chin/43.png", groupName:"chin", boundsBottom:348},
    {src:"assets/images/chin/44.png", groupName:"chin", boundsBottom:284},
    {src:"assets/images/chin/45.png", groupName:"chin", boundsBottom:334},
    {src:"assets/images/chin/46.png", groupName:"chin", boundsBottom:282},
    {src:"assets/images/chin/47.png", groupName:"chin", boundsBottom:295},
    {src:"assets/images/chin/49.png", groupName:"chin", boundsBottom:342},
    {src:"assets/images/chin/50.png", groupName:"chin", boundsBottom:288},
    {src:"assets/images/chin/51.png", groupName:"chin", boundsBottom:289},
    {src:"assets/images/chin/52.png", groupName:"chin", boundsBottom:274},
    {src:"assets/images/chin/53.png", groupName:"chin", boundsBottom:284},
    {src:"assets/images/chin/54.png", groupName:"chin", boundsBottom:289},
    {src:"assets/images/chin/55.png", groupName:"chin", boundsBottom:307},
    {src:"assets/images/chin/56.png", groupName:"chin", boundsBottom:286},
    {src:"assets/images/chin/57.png", groupName:"chin", boundsBottom:298},
    {src:"assets/images/chin/58.png", groupName:"chin", boundsBottom:271},
    {src:"assets/images/chin/59.png", groupName:"chin", boundsBottom:331},
    {src:"assets/images/chin/60.png", groupName:"chin", boundsBottom:352},
    {src:"assets/images/chin/63.png", groupName:"chin", boundsBottom:304},
    {src:"assets/images/chin/64.png", groupName:"chin", boundsBottom:339},
    {src:"assets/images/chin/65.png", groupName:"chin", boundsBottom:311},

    {src:"assets/images/nose/_MG_0248.png", groupName:"nose"},
    {src:"assets/images/nose/_MG_0254.png", groupName:"nose"},
    {src:"assets/images/nose/_MG_0256.png", groupName:"nose"},
    {src:"assets/images/nose/_MG_0263.png", groupName:"nose"},
    {src:"assets/images/nose/_MG_0264.png", groupName:"nose"},
    {src:"assets/images/nose/_MG_0265.png", groupName:"nose"},
    {src:"assets/images/nose/_MG_0266.png", groupName:"nose"},
    {src:"assets/images/nose/_MG_0267.png", groupName:"nose"},

    {src:"assets/images/mouth/_MG_0248.png", groupName:"mouth"},
    {src:"assets/images/mouth/_MG_0254.png", groupName:"mouth"},
    {src:"assets/images/mouth/_MG_0256.png", groupName:"mouth"},
    {src:"assets/images/mouth/_MG_0263.png", groupName:"mouth"},
    {src:"assets/images/mouth/_MG_0264.png", groupName:"mouth"},
    {src:"assets/images/mouth/_MG_0265.png", groupName:"mouth"},
    {src:"assets/images/mouth/_MG_0266.png", groupName:"mouth"},
    {src:"assets/images/mouth/_MG_0267.png", groupName:"mouth"},
    {src:"assets/images/mouth/_MG_0268.png", groupName:"mouth"},
    {src:"assets/images/mouth/_MG_0269.png", groupName:"mouth"},
    {src:"assets/images/mouth/_MG_0271.png", groupName:"mouth"},
    {src:"assets/images/mouth/_MG_0272.png", groupName:"mouth"},
    {src:"assets/images/mouth/_MG_0273.png", groupName:"mouth"},
    {src:"assets/images/mouth/_MG_0274.png", groupName:"mouth"},

    {src:"assets/images/mouth/_MG_0275.png", groupName:"mouth"},
    {src:"assets/images/mouth/_MG_0276.png", groupName:"mouth"},
    {src:"assets/images/mouth/_MG_0277.png", groupName:"mouth"},
    {src:"assets/images/mouth/_MG_0278.png", groupName:"mouth"},
    {src:"assets/images/mouth/_MG_0279.png", groupName:"mouth"},
    {src:"assets/images/mouth/_MG_0280.png", groupName:"mouth"},
    {src:"assets/images/mouth/_MG_0281.png", groupName:"mouth"},
    {src:"assets/images/mouth/_MG_0282.png", groupName:"mouth"},
    {src:"assets/images/mouth/_MG_0283.png", groupName:"mouth"},
    {src:"assets/images/mouth/_MG_0284.png", groupName:"mouth"},
    {src:"assets/images/mouth/_MG_0285.png", groupName:"mouth"},
    {src:"assets/images/mouth/_MG_0286.png", groupName:"mouth"},
    {src:"assets/images/mouth/_MG_0287.png", groupName:"mouth"},
    {src:"assets/images/mouth/_MG_0288.png", groupName:"mouth"},
    {src:"assets/images/mouth/_MG_0289.png", groupName:"mouth"},
    {src:"assets/images/mouth/_MG_0290.png", groupName:"mouth"},
    {src:"assets/images/mouth/_MG_0291.png", groupName:"mouth"},
    {src:"assets/images/mouth/_MG_0292.png", groupName:"mouth"},
    {src:"assets/images/mouth/_MG_0293.png", groupName:"mouth"},
    {src:"assets/images/mouth/_MG_0295.png", groupName:"mouth"},


    // previous first image 248
    {src:"assets/images/lefteye/_MG_0244.png", groupName:"lefteye"},
    {src:"assets/images/lefteye/_MG_0245.png", groupName:"lefteye"},
    {src:"assets/images/lefteye/_MG_0246.png", groupName:"lefteye"},
    {src:"assets/images/lefteye/_MG_0247.png", groupName:"lefteye"},
    {src:"assets/images/lefteye/_MG_0248.png", groupName:"lefteye"},
    {src:"assets/images/lefteye/_MG_0249.png", groupName:"lefteye"},
    {src:"assets/images/lefteye/_MG_0250.png", groupName:"lefteye"},
    {src:"assets/images/lefteye/_MG_0251.png", groupName:"lefteye"},
    {src:"assets/images/lefteye/_MG_0252.png", groupName:"lefteye"},
    {src:"assets/images/lefteye/_MG_0253.png", groupName:"lefteye"},
    {src:"assets/images/lefteye/_MG_0254.png", groupName:"lefteye"},
    {src:"assets/images/lefteye/_MG_0256.png", groupName:"lefteye"},
    {src:"assets/images/lefteye/_MG_0263.png", groupName:"lefteye"},
    {src:"assets/images/lefteye/_MG_0264.png", groupName:"lefteye"},
    {src:"assets/images/lefteye/_MG_0265.png", groupName:"lefteye"},
    {src:"assets/images/lefteye/_MG_0266.png", groupName:"lefteye"},
    {src:"assets/images/lefteye/_MG_0267.png", groupName:"lefteye"},
    {src:"assets/images/lefteye/_MG_0268.png", groupName:"lefteye"},
    {src:"assets/images/lefteye/_MG_0269.png", groupName:"lefteye"},
    {src:"assets/images/lefteye/_MG_0271.png", groupName:"lefteye"},
    {src:"assets/images/lefteye/_MG_0272.png", groupName:"lefteye"},
    {src:"assets/images/lefteye/_MG_0273.png", groupName:"lefteye"},
    {src:"assets/images/lefteye/_MG_0274.png", groupName:"lefteye"},
    {src:"assets/images/lefteye/_MG_0275.png", groupName:"lefteye"},
    {src:"assets/images/lefteye/_MG_0276.png", groupName:"lefteye"},
    {src:"assets/images/lefteye/_MG_0277.png", groupName:"lefteye"},
    {src:"assets/images/lefteye/_MG_0278.png", groupName:"lefteye"},
    {src:"assets/images/lefteye/_MG_0279.png", groupName:"lefteye"},
    {src:"assets/images/lefteye/_MG_0280.png", groupName:"lefteye"},
    {src:"assets/images/lefteye/_MG_0281.png", groupName:"lefteye"},
    {src:"assets/images/lefteye/_MG_0282.png", groupName:"lefteye"},
    {src:"assets/images/lefteye/_MG_0283.png", groupName:"lefteye"},
    {src:"assets/images/lefteye/_MG_0284.png", groupName:"lefteye"},
    {src:"assets/images/lefteye/_MG_0285.png", groupName:"lefteye"},
    {src:"assets/images/lefteye/_MG_0286.png", groupName:"lefteye"},
    {src:"assets/images/lefteye/_MG_0287.png", groupName:"lefteye"},
    {src:"assets/images/lefteye/_MG_0288.png", groupName:"lefteye"},
    {src:"assets/images/lefteye/_MG_0289.png", groupName:"lefteye"},
    {src:"assets/images/lefteye/_MG_0290.png", groupName:"lefteye"},
    {src:"assets/images/lefteye/_MG_0291.png", groupName:"lefteye"},
    {src:"assets/images/lefteye/_MG_0292.png", groupName:"lefteye"},
    {src:"assets/images/lefteye/_MG_0293.png", groupName:"lefteye"},
    {src:"assets/images/lefteye/_MG_0295.png", groupName:"lefteye"},
    {src:"assets/images/lefteye/_MG_0296.png", groupName:"lefteye"},
    {src:"assets/images/lefteye/_MG_0298.png", groupName:"lefteye"},
    {src:"assets/images/lefteye/_MG_0299.png", groupName:"lefteye"},
    {src:"assets/images/lefteye/_MG_0300.png", groupName:"lefteye"},
    {src:"assets/images/lefteye/_MG_0301.png", groupName:"lefteye"},
    {src:"assets/images/lefteye/_MG_0302.png", groupName:"lefteye"},
    {src:"assets/images/lefteye/_MG_0303.png", groupName:"lefteye"},
    {src:"assets/images/lefteye/_MG_0304.png", groupName:"lefteye"},
    {src:"assets/images/lefteye/_MG_0305.png", groupName:"lefteye"},
    {src:"assets/images/lefteye/_MG_0306.png", groupName:"lefteye"},
    {src:"assets/images/lefteye/_MG_0307.png", groupName:"lefteye"},
    {src:"assets/images/lefteye/_MG_0308.png", groupName:"lefteye"},
    {src:"assets/images/lefteye/_MG_0309.png", groupName:"lefteye"},
    {src:"assets/images/lefteye/_MG_0310.png", groupName:"lefteye"},
    {src:"assets/images/lefteye/_MG_0311.png", groupName:"lefteye"},
    {src:"assets/images/lefteye/_MG_0312.png", groupName:"lefteye"},
    {src:"assets/images/lefteye/_MG_0313.png", groupName:"lefteye"},
    {src:"assets/images/lefteye/_MG_0314.png", groupName:"lefteye"},
    {src:"assets/images/lefteye/_MG_0315.png", groupName:"lefteye"},
    {src:"assets/images/lefteye/_MG_0316.png", groupName:"lefteye"},
    {src:"assets/images/lefteye/_MG_0317.png", groupName:"lefteye"},
    {src:"assets/images/lefteye/_MG_0318.png", groupName:"lefteye"},
    {src:"assets/images/lefteye/_MG_0319.png", groupName:"lefteye"},
    {src:"assets/images/lefteye/_MG_0320.png", groupName:"lefteye"},
    {src:"assets/images/lefteye/_MG_0321.png", groupName:"lefteye"},
    {src:"assets/images/lefteye/_MG_0322.png", groupName:"lefteye"},
    {src:"assets/images/lefteye/_MG_0323.png", groupName:"lefteye"},
    {src:"assets/images/lefteye/_MG_0324.png", groupName:"lefteye"},
    {src:"assets/images/lefteye/_MG_0326.png", groupName:"lefteye"},
    {src:"assets/images/lefteye/_MG_0327.png", groupName:"lefteye"},
    {src:"assets/images/lefteye/_MG_0328.png", groupName:"lefteye"},
    {src:"assets/images/lefteye/_MG_0329.png", groupName:"lefteye"},
    {src:"assets/images/lefteye/_MG_0330.png", groupName:"lefteye"},
    {src:"assets/images/lefteye/_MG_0331.png", groupName:"lefteye"},
    {src:"assets/images/lefteye/_MG_0332.png", groupName:"lefteye"},
    {src:"assets/images/lefteye/_MG_0333.png", groupName:"lefteye"},
    {src:"assets/images/lefteye/_MG_0334.png", groupName:"lefteye"},
    {src:"assets/images/lefteye/_MG_0335.png", groupName:"lefteye"},
    {src:"assets/images/lefteye/_MG_0336.png", groupName:"lefteye"},
    {src:"assets/images/lefteye/_MG_0337.png", groupName:"lefteye"},
    {src:"assets/images/lefteye/_MG_0338.png", groupName:"lefteye"},
    {src:"assets/images/lefteye/_MG_0339.png", groupName:"lefteye"},
    {src:"assets/images/lefteye/_MG_0340.png", groupName:"lefteye"},
    {src:"assets/images/lefteye/_MG_0341.png", groupName:"lefteye"},
    {src:"assets/images/lefteye/_MG_0342.png", groupName:"lefteye"},
    {src:"assets/images/lefteye/_MG_0344.png", groupName:"lefteye"},
    {src:"assets/images/lefteye/_MG_0345.png", groupName:"lefteye"},
    {src:"assets/images/lefteye/_MG_0347.png", groupName:"lefteye"},
    {src:"assets/images/lefteye/_MG_0348.png", groupName:"lefteye"},
    {src:"assets/images/lefteye/_MG_0350.png", groupName:"lefteye"},
    {src:"assets/images/lefteye/_MG_0351.png", groupName:"lefteye"},
    {src:"assets/images/lefteye/_MG_0352.png", groupName:"lefteye"},
    {src:"assets/images/lefteye/_MG_0353.png", groupName:"lefteye"},
    {src:"assets/images/lefteye/_MG_0354.png", groupName:"lefteye"},
    {src:"assets/images/lefteye/_MG_0355.png", groupName:"lefteye"},
    {src:"assets/images/lefteye/_MG_0356.png", groupName:"lefteye"},
    {src:"assets/images/lefteye/_MG_0357.png", groupName:"lefteye"},
    {src:"assets/images/lefteye/_MG_0358.png", groupName:"lefteye"},
    {src:"assets/images/lefteye/_MG_0359.png", groupName:"lefteye"},
    {src:"assets/images/lefteye/_MG_0360.png", groupName:"lefteye"},
    {src:"assets/images/lefteye/_MG_0361.png", groupName:"lefteye"},
    {src:"assets/images/lefteye/_MG_0362.png", groupName:"lefteye"},
    {src:"assets/images/lefteye/_MG_0363.png", groupName:"lefteye"},
    {src:"assets/images/lefteye/_MG_0364.png", groupName:"lefteye"},
    {src:"assets/images/lefteye/_MG_0365.png", groupName:"lefteye"},
    {src:"assets/images/lefteye/_MG_0366.png", groupName:"lefteye"},
    {src:"assets/images/lefteye/_MG_0367.png", groupName:"lefteye"},
    {src:"assets/images/lefteye/_MG_0368.png", groupName:"lefteye"},
    {src:"assets/images/lefteye/_MG_0369.png", groupName:"lefteye"},
    {src:"assets/images/lefteye/_MG_0370.png", groupName:"lefteye"},
    {src:"assets/images/lefteye/_MG_0371.png", groupName:"lefteye"},
    {src:"assets/images/lefteye/_MG_0372.png", groupName:"lefteye"},
    {src:"assets/images/lefteye/_MG_0373.png", groupName:"lefteye"},
    {src:"assets/images/lefteye/_MG_0374.png", groupName:"lefteye"},
    {src:"assets/images/lefteye/_MG_0375.png", groupName:"lefteye"},
    {src:"assets/images/lefteye/_MG_0376.png", groupName:"lefteye"},
    {src:"assets/images/lefteye/_MG_0377.png", groupName:"lefteye"},
    {src:"assets/images/lefteye/_MG_0378.png", groupName:"lefteye"},
    {src:"assets/images/lefteye/_MG_0379.png", groupName:"lefteye"},
    {src:"assets/images/lefteye/_MG_0381.png", groupName:"lefteye"},
    {src:"assets/images/lefteye/_MG_0382.png", groupName:"lefteye"},
    {src:"assets/images/lefteye/_MG_0383.png", groupName:"lefteye"},
    {src:"assets/images/lefteye/_MG_0384.png", groupName:"lefteye"},
    {src:"assets/images/lefteye/_MG_0385.png", groupName:"lefteye"},
    {src:"assets/images/lefteye/_MG_0386.png", groupName:"lefteye"},
    {src:"assets/images/lefteye/_MG_0387.png", groupName:"lefteye"},
    {src:"assets/images/lefteye/_MG_0388.png", groupName:"lefteye"},
    {src:"assets/images/lefteye/_MG_0389.png", groupName:"lefteye"},
    {src:"assets/images/lefteye/_MG_0390.png", groupName:"lefteye"},
    {src:"assets/images/lefteye/_MG_0392.png", groupName:"lefteye"},
    {src:"assets/images/lefteye/_MG_0393.png", groupName:"lefteye"},
    {src:"assets/images/lefteye/_MG_0394.png", groupName:"lefteye"},
    {src:"assets/images/lefteye/_MG_0395.png", groupName:"lefteye"},
    {src:"assets/images/lefteye/_MG_0396.png", groupName:"lefteye"},
    {src:"assets/images/lefteye/_MG_0398.png", groupName:"lefteye"},
    {src:"assets/images/lefteye/_MG_0399.png", groupName:"lefteye"},

    {src:"assets/images/righteye/_MG_0244.png", groupName:"righteye"},
    {src:"assets/images/righteye/_MG_0245.png", groupName:"righteye"},
    {src:"assets/images/righteye/_MG_0246.png", groupName:"righteye"},
    {src:"assets/images/righteye/_MG_0247.png", groupName:"righteye"},
    {src:"assets/images/righteye/_MG_0248.png", groupName:"righteye"},
    {src:"assets/images/righteye/_MG_0249.png", groupName:"righteye"},
    {src:"assets/images/righteye/_MG_0250.png", groupName:"righteye"},
    {src:"assets/images/righteye/_MG_0251.png", groupName:"righteye"},
    {src:"assets/images/righteye/_MG_0252.png", groupName:"righteye"},
    {src:"assets/images/righteye/_MG_0253.png", groupName:"righteye"},
    {src:"assets/images/righteye/_MG_0254.png", groupName:"righteye"},
    {src:"assets/images/righteye/_MG_0256.png", groupName:"righteye"},
    {src:"assets/images/righteye/_MG_0263.png", groupName:"righteye"},
    {src:"assets/images/righteye/_MG_0264.png", groupName:"righteye"},
    {src:"assets/images/righteye/_MG_0265.png", groupName:"righteye"},
    {src:"assets/images/righteye/_MG_0266.png", groupName:"righteye"},
    {src:"assets/images/righteye/_MG_0267.png", groupName:"righteye"},
    {src:"assets/images/righteye/_MG_0268.png", groupName:"righteye"},
    {src:"assets/images/righteye/_MG_0269.png", groupName:"righteye"},
    {src:"assets/images/righteye/_MG_0271.png", groupName:"righteye"},
    {src:"assets/images/righteye/_MG_0272.png", groupName:"righteye"},
    {src:"assets/images/righteye/_MG_0273.png", groupName:"righteye"},
    {src:"assets/images/righteye/_MG_0274.png", groupName:"righteye"},
    {src:"assets/images/righteye/_MG_0275.png", groupName:"righteye"},
    {src:"assets/images/righteye/_MG_0276.png", groupName:"righteye"},
    {src:"assets/images/righteye/_MG_0277.png", groupName:"righteye"},
    {src:"assets/images/righteye/_MG_0278.png", groupName:"righteye"},
    {src:"assets/images/righteye/_MG_0279.png", groupName:"righteye"},
    {src:"assets/images/righteye/_MG_0280.png", groupName:"righteye"},
    {src:"assets/images/righteye/_MG_0281.png", groupName:"righteye"},
    {src:"assets/images/righteye/_MG_0282.png", groupName:"righteye"},
    {src:"assets/images/righteye/_MG_0283.png", groupName:"righteye"},
    {src:"assets/images/righteye/_MG_0284.png", groupName:"righteye"},
    {src:"assets/images/righteye/_MG_0285.png", groupName:"righteye"},
    {src:"assets/images/righteye/_MG_0286.png", groupName:"righteye"},
    {src:"assets/images/righteye/_MG_0287.png", groupName:"righteye"},
    {src:"assets/images/righteye/_MG_0288.png", groupName:"righteye"},
    {src:"assets/images/righteye/_MG_0289.png", groupName:"righteye"},
    {src:"assets/images/righteye/_MG_0290.png", groupName:"righteye"},
    {src:"assets/images/righteye/_MG_0291.png", groupName:"righteye"},
    {src:"assets/images/righteye/_MG_0292.png", groupName:"righteye"},
    {src:"assets/images/righteye/_MG_0293.png", groupName:"righteye"},
    {src:"assets/images/righteye/_MG_0295.png", groupName:"righteye"},
    {src:"assets/images/righteye/_MG_0296.png", groupName:"righteye"},
    {src:"assets/images/righteye/_MG_0298.png", groupName:"righteye"},
    {src:"assets/images/righteye/_MG_0299.png", groupName:"righteye"},
    {src:"assets/images/righteye/_MG_0300.png", groupName:"righteye"},
    {src:"assets/images/righteye/_MG_0301.png", groupName:"righteye"},
    {src:"assets/images/righteye/_MG_0302.png", groupName:"righteye"},
    {src:"assets/images/righteye/_MG_0303.png", groupName:"righteye"},
    {src:"assets/images/righteye/_MG_0304.png", groupName:"righteye"},
    {src:"assets/images/righteye/_MG_0305.png", groupName:"righteye"},
    {src:"assets/images/righteye/_MG_0306.png", groupName:"righteye"},
    {src:"assets/images/righteye/_MG_0307.png", groupName:"righteye"},
    {src:"assets/images/righteye/_MG_0308.png", groupName:"righteye"},
    {src:"assets/images/righteye/_MG_0309.png", groupName:"righteye"},
    {src:"assets/images/righteye/_MG_0310.png", groupName:"righteye"},
    {src:"assets/images/righteye/_MG_0311.png", groupName:"righteye"},
    {src:"assets/images/righteye/_MG_0312.png", groupName:"righteye"},
    {src:"assets/images/righteye/_MG_0313.png", groupName:"righteye"},
    {src:"assets/images/righteye/_MG_0314.png", groupName:"righteye"},
    {src:"assets/images/righteye/_MG_0315.png", groupName:"righteye"},
    {src:"assets/images/righteye/_MG_0316.png", groupName:"righteye"},
    {src:"assets/images/righteye/_MG_0317.png", groupName:"righteye"},
    {src:"assets/images/righteye/_MG_0318.png", groupName:"righteye"},
    {src:"assets/images/righteye/_MG_0319.png", groupName:"righteye"},
    {src:"assets/images/righteye/_MG_0320.png", groupName:"righteye"},
    {src:"assets/images/righteye/_MG_0321.png", groupName:"righteye"},
    {src:"assets/images/righteye/_MG_0322.png", groupName:"righteye"},
    {src:"assets/images/righteye/_MG_0323.png", groupName:"righteye"},
    {src:"assets/images/righteye/_MG_0324.png", groupName:"righteye"},
    {src:"assets/images/righteye/_MG_0326.png", groupName:"righteye"},
    {src:"assets/images/righteye/_MG_0327.png", groupName:"righteye"},
    {src:"assets/images/righteye/_MG_0328.png", groupName:"righteye"},
    {src:"assets/images/righteye/_MG_0329.png", groupName:"righteye"},
    {src:"assets/images/righteye/_MG_0330.png", groupName:"righteye"},
    {src:"assets/images/righteye/_MG_0331.png", groupName:"righteye"},
    {src:"assets/images/righteye/_MG_0332.png", groupName:"righteye"},
    {src:"assets/images/righteye/_MG_0333.png", groupName:"righteye"},
    {src:"assets/images/righteye/_MG_0334.png", groupName:"righteye"},
    {src:"assets/images/righteye/_MG_0335.png", groupName:"righteye"},
    {src:"assets/images/righteye/_MG_0336.png", groupName:"righteye"},
    {src:"assets/images/righteye/_MG_0337.png", groupName:"righteye"},
    {src:"assets/images/righteye/_MG_0338.png", groupName:"righteye"},
    {src:"assets/images/righteye/_MG_0339.png", groupName:"righteye"},
    {src:"assets/images/righteye/_MG_0340.png", groupName:"righteye"},
    {src:"assets/images/righteye/_MG_0341.png", groupName:"righteye"},
    {src:"assets/images/righteye/_MG_0342.png", groupName:"righteye"},
    {src:"assets/images/righteye/_MG_0344.png", groupName:"righteye"},
    {src:"assets/images/righteye/_MG_0345.png", groupName:"righteye"},
    {src:"assets/images/righteye/_MG_0347.png", groupName:"righteye"},
    {src:"assets/images/righteye/_MG_0348.png", groupName:"righteye"},
    {src:"assets/images/righteye/_MG_0350.png", groupName:"righteye"},
    {src:"assets/images/righteye/_MG_0351.png", groupName:"righteye"},
    {src:"assets/images/righteye/_MG_0352.png", groupName:"righteye"},
    {src:"assets/images/righteye/_MG_0353.png", groupName:"righteye"},
    {src:"assets/images/righteye/_MG_0354.png", groupName:"righteye"},
    {src:"assets/images/righteye/_MG_0355.png", groupName:"righteye"},
    {src:"assets/images/righteye/_MG_0356.png", groupName:"righteye"},
    {src:"assets/images/righteye/_MG_0357.png", groupName:"righteye"},
    {src:"assets/images/righteye/_MG_0358.png", groupName:"righteye"},
    {src:"assets/images/righteye/_MG_0359.png", groupName:"righteye"},
    {src:"assets/images/righteye/_MG_0360.png", groupName:"righteye"},
    {src:"assets/images/righteye/_MG_0361.png", groupName:"righteye"},
    {src:"assets/images/righteye/_MG_0362.png", groupName:"righteye"},
    {src:"assets/images/righteye/_MG_0363.png", groupName:"righteye"},
    {src:"assets/images/righteye/_MG_0364.png", groupName:"righteye"},
    {src:"assets/images/righteye/_MG_0365.png", groupName:"righteye"},
    {src:"assets/images/righteye/_MG_0366.png", groupName:"righteye"},
    {src:"assets/images/righteye/_MG_0367.png", groupName:"righteye"},
    {src:"assets/images/righteye/_MG_0368.png", groupName:"righteye"},
    {src:"assets/images/righteye/_MG_0369.png", groupName:"righteye"},
    {src:"assets/images/righteye/_MG_0370.png", groupName:"righteye"},
    {src:"assets/images/righteye/_MG_0371.png", groupName:"righteye"},
    {src:"assets/images/righteye/_MG_0372.png", groupName:"righteye"},
    {src:"assets/images/righteye/_MG_0373.png", groupName:"righteye"},
    {src:"assets/images/righteye/_MG_0374.png", groupName:"righteye"},
    {src:"assets/images/righteye/_MG_0375.png", groupName:"righteye"},
    {src:"assets/images/righteye/_MG_0376.png", groupName:"righteye"},
    {src:"assets/images/righteye/_MG_0377.png", groupName:"righteye"},
    {src:"assets/images/righteye/_MG_0378.png", groupName:"righteye"},
    {src:"assets/images/righteye/_MG_0379.png", groupName:"righteye"},
    {src:"assets/images/righteye/_MG_0381.png", groupName:"righteye"},
    {src:"assets/images/righteye/_MG_0382.png", groupName:"righteye"},
    {src:"assets/images/righteye/_MG_0383.png", groupName:"righteye"},
    {src:"assets/images/righteye/_MG_0384.png", groupName:"righteye"},
    {src:"assets/images/righteye/_MG_0385.png", groupName:"righteye"},
    {src:"assets/images/righteye/_MG_0386.png", groupName:"righteye"},
    {src:"assets/images/righteye/_MG_0387.png", groupName:"righteye"},
    {src:"assets/images/righteye/_MG_0388.png", groupName:"righteye"},
    {src:"assets/images/righteye/_MG_0389.png", groupName:"righteye"},
    {src:"assets/images/righteye/_MG_0390.png", groupName:"righteye"},
    {src:"assets/images/righteye/_MG_0392.png", groupName:"righteye"},
    {src:"assets/images/righteye/_MG_0393.png", groupName:"righteye"},
    {src:"assets/images/righteye/_MG_0394.png", groupName:"righteye"},
    {src:"assets/images/righteye/_MG_0395.png", groupName:"righteye"},
    {src:"assets/images/righteye/_MG_0396.png", groupName:"righteye"},
    {src:"assets/images/righteye/_MG_0398.png", groupName:"righteye"},
    {src:"assets/images/righteye/_MG_0399.png", groupName:"righteye"},

];

function PreloaderList(list)
{
    // returns the list sorted so that loader loads items
    // from all groups in parallel instead of one group at a time
    function getList()
    {
        var groups = createFacePartGroups(list);
        var sortedList = createSortedList(groups);
        return sortedList;
    }

    function createFacePartGroups(facePartList)
    {
        var result = [];
        var groupNames = [];
        var groupName;
        var groupIndex;
        var item;

        for(var i = 0; i < facePartList.length; i++)
        {
            item = facePartList[i];
            groupName = item.groupName;
            groupIndex = groupNames.indexOf(groupName);

            if(groupIndex < 0)
            {
                groupNames.push(groupName);
                result.push([]);
                groupIndex = groupNames.indexOf(groupName);
            }

            result[groupIndex].push(item);
        }

        return result;
    }

    function createSortedList(facePartGroups)
    {
        var length = getHighestGroupLength(facePartGroups);
        var numberOfGroups = facePartGroups.length;
        var result = [];
        var item;

        for(var i = 0; i < length; i++)
        {
            for(var j = 0; j < numberOfGroups; j++)
            {
                item = facePartGroups[j][i];

                if(item)
                {
                    result.push(item);
                }
            }
        }

        return result;
    }

    function getHighestGroupLength(facePartGroups)
    {
        var highestLength = 0;

        for(var i = 0; i < facePartGroups.length; i++)
        {
            if(facePartGroups[i].length > highestLength)
            {
                highestLength = facePartGroups[i].length;
            }
        }

        return highestLength;
    }

    return {
        getList: getList
    };
}

module.exports = new PreloaderList(list);