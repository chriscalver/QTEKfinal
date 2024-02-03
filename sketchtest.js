// hey

let qteklogo;
let xpos = 460;
const message = "Inventory Central";
const messageX = xpos;
const messageY = 370;
const message2 = "Wirecharts and Diagrams";
const message2X = xpos;
const message2Y = 410;
const message3 = "Electrical Drawing";
const message3X = xpos;
const message3Y = 450;
const message4 = "Backplate Layout Details";
const message4X = xpos;
const message4Y = 490;
const message5 = "";
const message5X = xpos;
const message5Y = 530;
const message6 = "";
const message6X = xpos;
const message6Y = 570;
const message7 = "";
const message7X = xpos;
const message7Y = 610;

const messageBP = "Backplate Wirechart";
let BPpic;
const messageBPX = 14;
const messageBPY = 183;

const messageDoor = "Door Wire Chart";
let Doorpic;
const messageDoorX = 14;
const messageDoorY = 153;

const messageBulkhead = "Cablesets Wirechart";
let Bulkhead;
const messageBulkheadX = 14;
const messageBulkheadY = 213;

const messageTerminal = "View Terminal Spreadsheet";
let Terminal;
const messageTerminalX = 14;
const messageTerminalY = 153;

const messageBPLayout = "Backplate Lazercutter info";
let BPLayout;
const messageBPLayoutX = 14;
const messageBPLayoutY = 153;

const messageBOMLayout = "View Full BOM & Inventory";
let BOMLayout;
const messageBOMLayoutX = 14;
const messageBOMLayoutY = 153;

const messageMissingItems = "View All Missing Items";
let MissingItems;
const messageMissingItemsX = 14;
const messageMissingItemsY = 183;

const NUM_IMGS = 5,
  imgs = [];
let myArray = [];
let enclosureArray = [];
let backplateArray = [];
let OPstationArray = [];
let cablesArray = [];
let etcArray = [];

let currentImg = 0;
let backbackcounter = 0;
let counter;
let menu = true;
let wirecharts = false;
let pictures = false;
let TBlayout = false;
let cableLayout = false;
let BPlayout = false;
let inventory = false;
let btm = "Back to Main";
let btmX = 814;
let btmY = 150;
let terminalblock;
let terminalblock2;
let checkmark;
let xmark;
let inventory1;
let inventory2;
let inventory3;
let inventory4;
let inventory5;

let contactor;
let contactorbig;
let relay1;
let relaybig;
let safety1;
let safetybig;

let printpage = false;
let buttonPos = 10;
let canvas;
let indent = 150;
let test;
let pic;
let cablelayout;
let hole2;
let hole3;

function preload() {
  qteklogo = loadImage("data/QTEK.gif");
  font = loadFont("oswald.ttf");

  fetch("data/QtekBOM.xlsx")
    .then((response) => response.blob())
    .then((blob) => readXlsxFile(blob))
    .then((rows) => {
      //     // LOOP THROUGH ROWS
      append(myArray, rows);
      let i = 0; // skips header and space row

      while (i < myArray[0].length) {
        // console.log(myArray[0][0][i]);    //pull up column names
        // console.log(myArray[0][i][2]);    //pull up Location column
        if (myArray[0][i][2] === "enclosure" && myArray[0][i][5] === false) {
          // 0 is the blob  i is the row 3 is the column
          append(enclosureArray, myArray[0][i]); //apends all of the row to the new array
        }
        if (myArray[0][i][2] === "backplate" && myArray[0][i][5] === false) {
          // 0 is the blob  i is the row 3 is the column
          append(backplateArray, myArray[0][i]); //apends all of the row to the new array
        }

        if (myArray[0][i][2] === "op stn" && myArray[0][i][5] === false) {
          // 0 is the blob  i is the row 3 is the column
          append(OPstationArray, myArray[0][i]); //apends all of the row to the new array
        }
        if (myArray[0][i][2] === "cables" && myArray[0][i][5] === false) {
          // 0 is the blob  i is the row 3 is the column
          append(cablesArray, myArray[0][i]); //apends all of the row to the new array
        }
        if (myArray[0][i][2] === "etc" && myArray[0][i][5] === false) {
          // 0 is the blob  i is the row 3 is the column
          append(etcArray, myArray[0][i]); //apends all of the row to the new array
        }
        i++;
      }
    });
}

function setup() {
  if (windowWidth >= 1600) {
    indent = 300;
  }
  canvas = createCanvas(windowWidth, windowHeight + 350);
  canvas.position(indent, 0);
  frameRate(15);
  counter = new Count(0, 100);
  counter.start();
  BPpic = loadImage("data/backplate.jpg");
  Doorpic = loadImage("data/door.jpg");
  Bulkhead = loadImage("data/bulkhead3.jpg");
  checkmark = loadImage("data/checkmark.png");
  xmark = loadImage("data/xmark.png");

  terminalblock = loadImage("data/terminalblock.jpg");
  terminalblock2 = loadImage("data/terminalblock2.jpg");
  inventory1 = loadImage("data/enclosure.jpg");
  inventory2 = loadImage("data/layout.jpg");
  inventory3 = loadImage("data/hmi.jpg");
  inventory4 = loadImage("data/cables.jpg");
  inventory5 = loadImage("data/etc.jpg");
  wirechart1 = loadImage("data/bulkhead5.jpg");
  contactor = loadImage("data/contactors2.jpg");
  contactorbig = loadImage("data/contactors.jpg");
  relay1 = loadImage("data/relay2.jpg");
  safety1 = loadImage("data/safety1.jpg");
  relaybig = loadImage("data/relay1.jpg");
  safetybig = loadImage("data/safety2.jpg");
  cablelayout = loadImage("data/cablelayout.jpg");
  hole2 = loadImage("data/hole2.jpg");
  hole3 = loadImage("data/hole3.jpg");
}
function draw() {
  background("white");
  // console.log(mynewArray[1]);

  if (menu) {
    removeElements();
    strokeWeight(0.3);
    let location = 285;
    let xlocation = 460;
    let sVal = counter.s;
    let Progress = map(sVal, 0, 100, 0, 100);
    textFont(font);
    fill("grey");
    textSize(14);
    textSize(50);
    fill(198, 0, 0);
    text("ACP Digital Solutions", xpos, 130);
    textSize(22);
    fill("black");
    text("SUPERBOMBER #23456-01", xpos, 232);
    text("Due date: 01-12-24", xpos, 255);
    fill(198, 0, 0);
    textSize(14);
    let txt = text("Progress: " + sVal + "%", xlocation, location - 5);
    rect(xlocation, location, Progress, 9);
    stroke("black");
    noFill();
    rect(xlocation, location, 100, 9);
    if (floor == 100) {
      counter.reset();
    }
    //setupButtons();
    push();
    imageMode(CENTER);
    image(qteklogo, 525, 180, qteklogo.width / 2, qteklogo.height / 2);
    pop();
    // image(imgs[currentImg], 0, 0);
    textFont(font);
    fill("grey");
    line(460, 235, 680, 235);
    // textAlign(CENTER);
    textSize(26);
    if (isMouseInsideText(message, messageX, messageY)) {
      fill(0, 200, 255);
    } else {
      fill("grey");
    }
    text(message, messageX, messageY); //Inventory
    if (isMouseInsideText(message2, message2X, message2Y)) {
      // cursor(HAND);
      fill(0, 200, 255);
      //stroke(0, 200, 255);
    } else {
      // cursor(ARROW);
      fill("grey");
      //  stroke(255);
    }
    text(message2, message2X, message2Y);
    if (isMouseInsideText(message3, message3X, message3Y)) {
      // cursor(HAND);
      fill(0, 200, 255);
      //stroke(0, 200, 255);
    } else {
      // cursor(ARROW);
      fill("grey");
      //  stroke(255);
    }
    text(message3, message3X, message3Y);
    if (isMouseInsideText(message4, message4X, message4Y)) {
      // cursor(HAND);
      fill(0, 200, 255);
      //stroke(0, 200, 255);
    } else {
      // cursor(ARROW);
      fill("grey");
      //  stroke(255);
    }
    text(message4, message4X, message4Y);
    if (isMouseInsideText(message5, message5X, message5Y)) {
      // cursor(HAND);
      fill(0, 200, 255);
      //stroke(0, 200, 255);
    } else {
      // cursor(ARROW);
      fill("grey");
      //  stroke(255);
    }
    text(message5, message5X, message5Y);
    if (isMouseInsideText(message6, message6X, message6Y)) {
      // cursor(HAND);
      fill(0, 200, 255);
      //stroke(0, 200, 255);
    } else {
      // cursor(ARROW);
      fill("grey");
      //  stroke(255);
    }
    text(message6, message6X, message6Y);
    // if (isMouseInsideText(message7, message7X, message7Y)) {
    //     cursor(HAND);
    //     fill(0, 200, 255);
    //     //stroke(0, 200, 255);
    // } else {
    //     cursor(ARROW);
    //     fill('grey');
    //     //  stroke(255);
    // }
    // text(message7, message7X, message7Y);
  }

  if (printpage) {
    /////////////////////////////////////////////////////////////////////////////////////////
    removeElements();
    push();
    imageMode();
    let button = createButton("Print Diagram");
    button.position(250, 20);
    let buttoncancel = createButton("Cancel");
    buttoncancel.position(520, 20);
    pop();
    // safety1
    push();

    if (pic == "contactorpic") {
      image(
        contactorbig,
        50,
        100,
        contactorbig.width * 1.4,
        contactorbig.height * 1.4
      );
    }
    if (pic == "relaypic") {
      image(relaybig, 50, 100, relaybig.width * 0.8, relaybig.height * 0.8);
    }
    if (pic == "safetypic") {
      image(safetybig, 50, 100, safetybig.width * 1.3, safetybig.height * 1.3);
    }
    if (pic == "hole2") {
      image(hole2, 50, 100, hole2.width * 1.3, hole2.height * 1.3);
    }
    if (pic == "hole3") {
      image(hole3, 50, 100, hole3.width, hole3.height);
    }

    // image(contactorbig, 50, 100, contactorbig.width * 1.5, contactorbig.height * 1.5);
    pop();

    button.mousePressed(() => {
      removeElements();
      printpage = false;
      wirecharts = true;
      // menu = false;

      //button.hide();
      // buttonPos = 300;
      //button.hide();
      // button.position(0, buttonPos);
      print();
    });

    buttoncancel.mousePressed(() => {
      pic = "nope";
      removeElements();
      //removeElements();
      //printpage = false;
      wirecharts = true;

      // menu = false;

      //button.hide();
      // buttonPos = 300;
      //button.hide();
      // button.position(0, buttonPos);
      // print();
    });
  }

  if (inventory) {
    /////////////////////////////////////////////////////////////////////////////////////////inventory
    removeElements();
    push();
    imageMode(CENTER);
    image(qteklogo, 80, 50, qteklogo.width / 2, qteklogo.height / 2);
    pop();
    textSize(30);
    fill(198, 0, 0);
    text("Inventory Central", 14, 120);
    textSize(16);
    textFont(font);
    fill("grey");

    if (
      isMouseInsideText(messageBOMLayout, messageBOMLayoutX, messageBOMLayoutY)
    ) {
      cursor(HAND);
      fill(0, 200, 255);
      //stroke(0, 200, 255);
    } else {
      cursor(ARROW);
      fill("grey");
      //  stroke(255);
    }
    text(messageBOMLayout, messageBOMLayoutX, messageBOMLayoutY);

    if (
      isMouseInsideText(
        messageMissingItems,
        messageMissingItemsX,
        messageMissingItemsY
      )
    ) {
      cursor(HAND);
      fill(0, 200, 255);
      //stroke(0, 200, 255);
    } else {
      cursor(ARROW);
      fill("grey");
      //  stroke(255);
    }
    text(messageMissingItems, messageMissingItemsX, messageMissingItemsY);

    let picpos = 65; //y
    let headpos = picpos + 200;
    let selpos = picpos + 210;
    let checkpos = picpos + 190;
    textSize(20);
    fill(198, 0, 0);
    text("Enclosures", 327, headpos);
    text("Backplates", 503, headpos);
    text("Operator STN", 676, headpos);
    text("Cables", 882, headpos);
    text("Etc", 1063, headpos);
    image(inventory1, 300, picpos, inventory1.width / 4, inventory1.height / 4);
    image(
      inventory2,
      478,
      picpos + 4,
      inventory2.width / 3.6,
      inventory2.height / 3.6
    );
    image(
      inventory3,
      652,
      picpos,
      inventory3.width / 4.2,
      inventory3.height / 4.2
    );
    image(
      inventory4,
      845,
      picpos,
      inventory4.width / 3.1,
      inventory4.height / 3.1
    );
    image(
      inventory5,
      1020,
      picpos,
      inventory5.width / 6,
      inventory5.height / 6
    );

    indent = 0;
    if (windowWidth >= 1600) {
      indent = 300 / 2;
    }
    fill("blue");
    textSize(16);

    let j = 0;
    let w = 0;
    let p = 0;
    let r = 0;
    let t = 0;
    let spacer = 20;
    let limitter = 20;

    if (enclosureArray.length > 0) {
      image(xmark, 340, selpos, xmark.width, xmark.height);
      text("Missing Items", 323, headpos + 75);
    } else {
      text("Good to Go", 335, headpos + 75);
      image(
        checkmark,
        340,
        checkpos,
        checkmark.width / 5,
        checkmark.height / 5
      );
    }

    if (backplateArray.length > 0) {
      image(xmark, 515, selpos, xmark.width, xmark.height); //     bp
      text("Missing Items", 500, headpos + 75); //bp
    } else {
      text("Good to Go", 509, headpos + 75);
      image(
        checkmark,
        515,
        checkpos,
        checkmark.width / 5,
        checkmark.height / 5
      );
    }
    if (OPstationArray.length > 0) {
      image(xmark, 695, selpos, xmark.width, xmark.height); //     bp
      text("Missing Items", 680, headpos + 75); //bp
    } else {
      text("Good to Go", 692, headpos + 75);
      image(
        checkmark,
        698,
        checkpos,
        checkmark.width / 5,
        checkmark.height / 5
      );
    }
    if (cablesArray.length > 0) {
      image(xmark, 883, selpos, xmark.width, xmark.height); //     bp
      text("Missing Items", 869, headpos + 75); //bp
    } else {
      text("Good to Go", 878, headpos + 75);
      image(
        checkmark,
        880,
        checkpos,
        checkmark.width / 5,
        checkmark.height / 5
      );
    }
    if (etcArray.length > 0) {
      image(xmark, 1051, selpos, xmark.width, xmark.height); //     bp
      text("Missing Items", 1037, headpos + 75); //bp
    } else {
      text("Good to Go", 1043, headpos + 75);
      image(
        checkmark,
        1047,
        checkpos,
        checkmark.width / 5,
        checkmark.height / 5
      );
    }

    textSize(14);
    //textFont('arial');
    fill("black");
    while (r < enclosureArray.length) {
      let ttt = enclosureArray[r][1];
      text(ttt.substring(0, limitter), 315, headpos + 85 + spacer);
      spacer = spacer + 20;
      r++;
    }
    spacer = 20;
    while (j < backplateArray.length) {
      let ttt = backplateArray[j][1];
      text(ttt.substring(0, limitter), 492, headpos + 85 + spacer);
      spacer = spacer + 20;
      j++;
    }
    spacer = 20;
    while (t < OPstationArray.length) {
      let ttt = OPstationArray[t][1];
      text(ttt.substring(0, limitter), 675, headpos + 85 + spacer);
      spacer = spacer + 20;
      t++;
    }
    spacer = 20;
    while (w < cablesArray.length) {
      let ttt = nfs(cablesArray[w][4]);
      text(ttt.substring(0, limitter), 868, headpos + 85 + spacer);
      spacer = spacer + 20;
      w++;
    }
    spacer = 20;
    while (p < etcArray.length) {
      let ttt = etcArray[p][1];
      //textWrap(WORD);
      text(ttt.substring(0, limitter), 1025, headpos + 85 + spacer);
      spacer = spacer + 20;
      p++;
    }

    fill("blue");
    textSize(16);
    btmX = 14;
    btmY = 250;
    text(btm, btmX, btmY);
  }
  ///////////////////////////////////////////////////////////////////////////////////////////////////////////wirecharts
  if (wirecharts) {
    removeElements();
    textSize(16);
    textFont(font);
    fill("grey");
    text("Door Wirechart", 322, 270);
    text("Backplate Wirechart", 483, 270);
    text("Cablesets Wirechart", 670, 270);
    textSize(14);
    text("Contactor", 848, 180);
    text("Wiring Diagram", 834, 197);
    text("Control Relay", 932, 180);
    text("Wiring Diagram", 927, 197);
    text("Safety Relay", 1026, 180);
    text("Wiring Diagram", 1019, 197);

    fill("#C60000");
    text("Print", 856, 224);
    text("Print", 949, 224);
    text("Print", 1040, 224);
    // image(inventory3, 845, 70, inventory4.width / 3.1, inventory4.height / 3.1);
    push();
    imageMode(CENTER);
    image(qteklogo, 80, 50, qteklogo.width / 2, qteklogo.height / 2);
    pop();
    image(inventory1, 300, 63, inventory1.width / 4, inventory1.height / 4);
    image(
      inventory2,
      478,
      65 + 4,
      inventory2.width / 3.6,
      inventory2.height / 3.6
    );
    image(wirechart1, 652, 65, inventory3.width / 4.2, inventory3.height / 4.2);

    image(cablelayout, 290, 300, cablelayout.width, cablelayout.height);
    // fill('grey');
    // text('OP Station Enet', 298, 410);
    // text('Valve Bank', 417, 410);
    // text('006-08PS', 530, 410);
    // text('006-01PRX', 642, 410);
    // text('006-03LS', 754, 410);
    // text('002-06M', 863, 410);

    // text('006-02PCR', 642, 430);
    // text('006-09PS', 530, 430);
    // text('006-05LS', 754, 430);

    // text('010-00SV', 530, 450);
    // text('006-00PCE', 642, 450);
    // text('007-00PRX', 754, 450);

    // text('010-08SV', 530, 470);
    // text('006-00PCR', 642, 470);
    // text('007-01PRX', 754, 470);

    // text('OP STN 4Pin', 642, 578);
    // text('004-06SV', 754, 578);
    // text('Power Cable', 863, 578);

    // text('OP STN 12Pin', 642, 598);
    // text('004-06LS', 754, 598);

    // text('003-07CAM', 642, 618);
    // text('004-09SV', 754, 618);

    // text('007-PENDENT', 642, 638);
    // text('004-09LS', 754, 638);

    textSize(26);
    fill(198, 0, 0);
    text("Wirecharts & Diagrams", 14, 120);
    textFont(font);
    fill("grey");
    // textSize(20);
    fill("blue");
    push();
    tint(255, 200);
    image(contactor, 835, 75, contactor.width / 1.4, contactor.height / 1.4);
    image(relay1, 935, 75, relay1.width / 1.5, relay1.height / 1.5);
    image(safety1, 1024, 75, safety1.width / 1.6, safety1.height / 1.6);
    pop();

    textSize(16);
    btmX = 14;
    btmY = 270;
    text(btm, btmX, btmY);
    if (isMouseInsideText(messageBP, messageBPX, messageBPY)) {
      cursor(HAND);
      fill(0, 200, 255);
      //stroke(0, 200, 255);
    } else {
      cursor(ARROW);
      fill("grey");
      //  stroke(255);
    }
    text(messageBP, messageBPX, messageBPY);
    if (isMouseInsideText(messageDoor, messageDoorX, messageDoorY)) {
      cursor(HAND);
      fill(0, 200, 255);
      //stroke(0, 200, 255);
    } else {
      cursor(ARROW);
      fill("grey");
      //  stroke(255);
    }
    text(messageDoor, messageDoorX, messageDoorY);
    if (
      isMouseInsideText(messageBulkhead, messageBulkheadX, messageBulkheadY)
    ) {
      cursor(HAND);
      fill(0, 200, 255);
      //stroke(0, 200, 255);
    } else {
      cursor(ARROW);
      fill("grey");
      //  stroke(255);
    }
    text(messageBulkhead, messageBulkheadX, messageBulkheadY);
    // image(imgs[currentImg], 20, 20, imgs[currentImg].width / 4, imgs[currentImg].height / 4);
  }
  if (pictures) {
    image(
      imgs[currentImg],
      20,
      20,
      imgs[currentImg].width / 4,
      imgs[currentImg].height / 4
    );
    push();
    imageMode(CENTER);
    image(qteklogo, 880, 50, qteklogo.width / 2, qteklogo.height / 2);
    //image(qteklogo, imgs[currentImg].width / 4 + 100, 50, qteklogo.width / 2, qteklogo.height / 2);
    pop();
    fill("blue");
    textSize(16);
    btmX = 814;
    btmY = 150;
    text(btm, btmX, btmY);
    if (backbackcounter < 1) {
      //  setupButtons();
    }
    previous.position(1090 + 80, 90);
    next.position(1150 + 80, 90);
    backbackcounter++;
    //console.log(backbackcounter);
  }
  if (TBlayout) {
    push();
    imageMode(CENTER);
    image(qteklogo, 80, 50, qteklogo.width / 2, qteklogo.height / 2);
    //image(qteklogo, imgs[currentImg].width / 4 + 100, 50, qteklogo.width / 2, qteklogo.height / 2);
    pop();
    textSize(30);
    fill(198, 0, 0);
    text("Terminal Block Layout", 14, 120);
    fill("blue");
    // line(360, 235, 625, 235);
    // textAlign(CENTER);
    textSize(16);
    btmX = 14;
    btmY = 210;
    text(btm, btmX, btmY);
    //text(messageTerminal, messageTerminalX, messageTerminalY);
    if (
      isMouseInsideText(messageTerminal, messageTerminalX, messageTerminalY)
    ) {
      cursor(HAND);
      fill(0, 200, 255);
      //stroke(0, 200, 255);
    } else {
      cursor(ARROW);
      fill("grey");
      //  stroke(255);
    }
    text(messageTerminal, messageTerminalX, messageTerminalY);
    image(
      terminalblock2,
      370,
      350,
      terminalblock2.width / 1.5,
      terminalblock2.height / 1.5
    );
    image(
      terminalblock,
      380,
      50,
      terminalblock.width / 2.5,
      terminalblock.height / 2.5
    );
  }
  if (cableLayout) {
    push();
    imageMode(CENTER);
    image(qteklogo, 80, 50, qteklogo.width / 2, qteklogo.height / 2);
    pop();
    textSize(30);
    fill(198, 0, 0);
    text("Cable Layout", 14, 120);
    fill("blue");
    textSize(16);
    btmX = 14;
    btmY = 150;
    text(btm, btmX, btmY);
  }
  if (BPlayout) {
    push();
    imageMode(CENTER);
    image(qteklogo, 80, 50, qteklogo.width / 2, qteklogo.height / 2);
    pop();
    textSize(30);
    fill(198, 0, 0);
    text("Backplate Layout", 14, 120);
    fill("blue");
    // line(360, 235, 625, 235);
    // textAlign(CENTER);
    textSize(16);
    btmX = 14;
    btmY = 210;
    text(btm, btmX, btmY);
    if (
      isMouseInsideText(messageBPLayout, messageBPLayoutX, messageBPLayoutY)
    ) {
      cursor(HAND);
      fill(0, 200, 255);
      //stroke(0, 200, 255);
    } else {
      cursor(ARROW);
      fill("grey");
      //  stroke(255);
    }
    text(messageBPLayout, messageBPLayoutX, messageBPLayoutY);
  }
}
// end of draw
var setupButtons = (_) => {
  previous = createButton("Prev");
  previous.position(1090 + 80, 90);
  if (menu) {
    previous.position(-940, 100);
  }
  previous.mouseClicked((_) => {
    if (currentImg > 0) currentImg--;
  });
  next = createButton("Next");
  next.position(1150 + 80, 90);
  if (menu) {
    next.position(-1020, 100);
  }
  next.mouseClicked((_) => {
    if (currentImg < imgs.length - 1) currentImg++;
  });
};

function mouseClicked() {
  if (isMouseInsideText(btm, btmX, btmY)) {
    //previous.position(-940, 100);
    //next.position(-1020, 100);
    //setupButtons();
    removeElements();
    wirecharts = false;
    printpage = false;
    pictures = false;
    TBlayout = false;
    cableLayout = false;
    BPlayout = false;
    inventory = false;
    menu = true;
  }
  if (menu) {
    removeElements();
    if (isMouseInsideText(message, messageX, messageY)) {
      //  menu = false;
      //window.open('http://www.chriscalver.com/', '_blank');
      // window.open('/data/QTEK.gif', '_blank');
      // window.open('data/Wirechart.pdf', '_blank');
      inventory = true;
      menu = false;
    }
    if (isMouseInsideText(message2, message2X, message2Y)) {
      wirecharts = true;
      menu = false;
    }
    if (isMouseInsideText(message3, message3X, message3Y)) {
      window.open("data/Electrical.pdf", "_blank");
    }
    if (isMouseInsideText(message4, message4X, message4Y)) {
      TBlayout = true;
      menu = false;
    }
    if (isMouseInsideText(message5, message5X, message5Y)) {
      BPlayout = true;
      menu = false;
    }
    if (isMouseInsideText(message6, message6X, message6Y)) {
      cableLayout = true;
      menu = false;
    }
  }
  // if (isMouseInsideText(message7, message7X, message7Y)) {
  //     inventory = true;
  //     menu = false;
  // }
  if (inventory) {
    if (
      isMouseInsideText(messageBOMLayout, messageBOMLayoutX, messageBOMLayoutY)
    ) {
      window.open("data/QtekBOM.pdf", "_blank");
    }
    if (
      isMouseInsideText(
        messageMissingItems,
        messageMissingItemsX,
        messageMissingItemsY
      )
    ) {
      // window.open('data/QtekBOM.pdf', '_blank');
    }
  }
  if (wirecharts) {
    if (isMouseInsideText(messageBP, messageBPX, messageBPY)) {
      window.open("data/QTEKbackplateWirechart.pdf", "_blank");
    }
    if (isMouseInsideText(messageDoor, messageDoorX, messageDoorY)) {
      window.open("data/QTEKdoorWirechart.pdf", "_blank");
    }
    if (
      isMouseInsideText(messageBulkhead, messageBulkheadX, messageBulkheadY)
    ) {
      window.open("data/QTEKcableSets.pdf", "_blank");
    }
    // console.log("X " + mouseX);
    // console.log("Y " + mouseY);
    if (mouseX > 300 && mouseX < 430 && mouseY > 70 && mouseY < 275) {
      window.open("data/QTEKdoorWirechart.pdf", "_blank");
    }
    if (mouseX > 475 && mouseX < 600 && mouseY > 70 && mouseY < 275) {
      window.open("data/QTEKbackplateWirechart.pdf", "_blank");
    }
    if (mouseX > 650 && mouseX < 800 && mouseY > 70 && mouseY < 281) {
      window.open("data/QTEKcableSets.pdf", "_blank");
    }

    if (mouseX > 1015 && mouseX < 1090 && mouseY > 78 && mouseY < 200) {
      window.open("data/safety2.jpg", "_blank");
    }
    if (mouseX > 925 && mouseX < 1000 && mouseY > 78 && mouseY < 200) {
      window.open("data/relay1.jpg", "_blank");
    }
    if (mouseX > 820 && mouseX < 910 && mouseY > 78 && mouseY < 200) {
      // image(contactorbig, 300, 463, contactorbig.width / 2, contactorbig.height / 2);
      window.open("data/contactors.jpg", "_blank");
    }
    if (mouseX > 840 && mouseX < 900 && mouseY > 210 && mouseY < 235) {
      wirecharts = false;
      printpage = true;
      pic = "contactorpic";
      removeElements();
      //  print();
      // image(contactorbig, 300, 463, contactorbig.width / 2, contactorbig.height / 2);
      //  window.open('data/contactors.jpg', '_blank');
    }

    if (mouseX > 930 && mouseX < 980 && mouseY > 210 && mouseY < 235) {
      wirecharts = false;
      printpage = true;
      pic = "relaypic";
      //  removeElements();
      //  print();
      // image(contactorbig, 300, 463, contactorbig.width / 2, contactorbig.height / 2);
      //  window.open('data/contactors.jpg', '_blank');
    }

    if (mouseX > 1025 && mouseX < 1080 && mouseY > 210 && mouseY < 235) {
      wirecharts = false;
      printpage = true;
      pic = "safetypic";
      //  removeElements();
      //  print();
      // image(contactorbig, 300, 463, contactorbig.width / 2, contactorbig.height / 2);
      //  window.open('data/contactors.jpg', '_blank');
    }

    // if (mouseX > 410 && mouseX < 479 && mouseY > 320 && mouseY < 380) {
    //     wirecharts = false;
    //     printpage = true;
    //     pic = 'hole2';
    //     //  removeElements();
    //     //  print();
    //     // image(contactorbig, 300, 463, contactorbig.width / 2, contactorbig.height / 2);
    //     //  window.open('data/contactors.jpg', '_blank');
    // }

    // if (mouseX > 517 && mouseX < 588 && mouseY > 320 && mouseY < 400) {
    //     wirecharts = false;
    //     printpage = true;
    //     pic = 'hole3';
    //     //  removeElements();
    //     //  print();
    //     // image(contactorbig, 300, 463, contactorbig.width / 2, contactorbig.height / 2);
    //     //  window.open('data/contactors.jpg', '_blank');
    // }
    console.log(pic);
    console.log("X " + mouseX);
    console.log("Y " + mouseY);
  }
  if (TBlayout) {
    if (
      isMouseInsideText(messageTerminal, messageTerminalX, messageTerminalY)
    ) {
      window.open("data/QTEKbackplateWirechart.pdf", "_blank");
    }
  }
  if (BPLayout) {
    window.open("data/QTEKbackplateWirechart.pdf", "_blank");
  }
}
function isMouseInsideText(message, messageX, messageY) {
  const messageWidth = textWidth(message);
  const messageTop = messageY - textAscent();
  const messageBottom = messageY + textDescent();
  return (
    mouseX > messageX &&
    mouseX < messageX + messageWidth &&
    mouseY > messageTop &&
    mouseY < messageBottom
  );
}
class Count {
  constructor(s, w) {
    this.s = s;
    this.w = w;
    this.p = createP("");
  }
  start() {
    if (!this.done) {
      setInterval(() => this.counter(), this.w);
    }
  }
  counter() {
    if (this.s < 96) {
      this.s = this.s + 4;
      //this.p.html(this.s)
    }
  }
  reset() {
    this.s = 0;
  }
}
