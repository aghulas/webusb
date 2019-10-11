const connectButton = document.getElementById("connectButton");
const disconnectButton = document.getElementById("disconnectButton");
const colourPicker = document.getElementById("colourPicker");
const colourButton = document.getElementById("colourButton");

const connect = document.getElementById("connect");
const deviceHeartbeat = document.getElementById("deviceHeartbeat");
const deviceButtonPressed = document.getElementById("deviceButtonPressed");

const filters = [
    { vndorId: 0x04d8, prouctId: 0xffee }, // RLY02
];

navigator.usb.addEventListener('connect', event => {
    let device = event.device;
    console.log("Vendor ID = 0x" + device.vendorId.toString(16) + " : " + device.manufacturerName);
    console.log("Product ID = 0x" + device.productId.toString(16) + " : " + device.productName);
    console.log("Serial = " + device.serialNumber);
    switch (device.deviceClass) {
        case 0x00:
            console.log("Base Class ( Ox" + device.deviceClass.toString(16) + " 0x" + device.deviceSubclass.toString(16) + " 0x" + device.deviceProtocol.toString(16) + " )");
            break;
        case 0x02:
            console.log("Communication Device Class ( Ox" + device.deviceClass.toString(16) + " 0x" + device.deviceSubclass.toString(16) + " 0x" + device.deviceProtocol.toString(16) + " )");
            break;
        case 0x09:
            console.log("Hub Class ( Ox" + device.deviceClass.toString(16) + " 0x" + device.deviceSubclass.toString(16) + " 0x" + device.deviceProtocol.toString(16) + " )");
            break;
        case 0x11:
            console.log("Billboard Device Class ( Ox" + device.deviceClass.toString(16) + " 0x" + device.deviceSubclass.toString(16) + " 0x" + device.deviceProtocol.toString(16) + " )");
            break;
        case 0xdc:
            console.log("Diagnostic Device Class ( Ox" + device.deviceClass.toString(16) + " 0x" + device.deviceSubclass.toString(16) + " 0x" + device.deviceProtocol.toString(16) + " )");
            break;
        case 0xef:
            console.log("Miscellaneous Class ( Ox" + device.deviceClass.toString(16) + " 0x" + device.deviceSubclass.toString(16) + " 0x" + device.deviceProtocol.toString(16) + " )");
            break;
        case 0xff:
            console.log("Vendor Specific ( Ox" + device.deviceClass.toString(16) + " 0x" + device.deviceSubclass.toString(16) + " 0x" + device.deviceProtocol.toString(16) + " )");
            break;

        default :
            console.log("Device Class = Ox" + device.deviceClass.toString(16) + " 0x" + device.deviceSubclass.toString(16) + " 0x" + device.deviceProtocol.toString(16));
            break;
    }
    console.log("Device Version = " + device.deviceVersionMajor + "." + device.deviceVersionMinor + "." + device.deviceVersionSubminor);
    console.log("USB Version = " + device.usbVersionMajor + "." + device.usbVersionMinor + "." + device.usbVersionSubminor);
    device.configurations.map(configuration => {
        console.log("\tConfiguration #" + configuration.configurationValue);
        configuration.interfaces.forEach((iface, index, array) => {
            console.log("\t\tInterface #" + iface.interfaceNumber + " (claimed = " + iface.claimed + ")");
            iface.alternates.forEach((alternate, idx, arr) => {
                switch (alternate.interfaceClass) {
                    case 0x01:
                        console.log("\t\t\tAlternate Setting #" + alternate.alternateSetting + " : Audio Class ( Ox" + alternate.interfaceClass.toString(16) + " 0x" + alternate.interfaceSubclass.toString(16) + " 0x" + alternate.interfaceProtocol.toString(16) + " )");
                        break;
                    case 0x02:
                        console.log("\t\t\tAlternate Setting #" + alternate.alternateSetting + " : CDC-Control Class ( Ox" + alternate.interfaceClass.toString(16) + " 0x" + alternate.interfaceSubclass.toString(16) + " 0x" + alternate.interfaceProtocol.toString(16) + " )");
                        break;
                    case 0x03:
                        console.log("\t\t\tAlternate Setting #" + alternate.alternateSetting + " : HID Device Class ( Ox" + alternate.interfaceClass.toString(16) + " 0x" + alternate.interfaceSubclass.toString(16) + " 0x" + alternate.interfaceProtocol.toString(16) + " )");
                        break;
                    case 0x05:
                        console.log("\t\t\tAlternate Setting #" + alternate.alternateSetting + " : Physical Device Class ( Ox" + alternate.interfaceClass.toString(16) + " 0x" + alternate.interfaceSubclass.toString(16) + " 0x" + alternate.interfaceProtocol.toString(16) + " )");
                        break;
                    case 0x06:
                        console.log("\t\t\tAlternate Setting #" + alternate.alternateSetting + " : Still Imaging Interface Class ( Ox" + alternate.interfaceClass.toString(16) + " 0x" + alternate.interfaceSubclass.toString(16) + " 0x" + alternate.interfaceProtocol.toString(16) + " )");
                        break;
                    case 0x07:
                        console.log("\t\t\tAlternate Setting #" + alternate.alternateSetting + " : Printer alternate ( Ox" + alternate.interfaceClass.toString(16) + " 0x" + alternate.interfaceSubclass.toString(16) + " 0x" + alternate.interfaceProtocol.toString(16) + " )");
                        break;
                    case 0x08:
                        console.log("\t\t\tAlternate Setting #" + alternate.alternateSetting + " : Mass Storage Device Class ( Ox" + alternate.interfaceClass.toString(16) + " 0x" + alternate.interfaceSubclass.toString(16) + " 0x" + alternate.interfaceProtocol.toString(16) + " )");
                        break;
                    case 0x0a:
                        console.log("\t\t\tAlternate Setting #" + alternate.alternateSetting + " : CDC-Data Class ( Ox" + alternate.interfaceClass.toString(16) + " 0x" + alternate.interfaceSubclass.toString(16) + " 0x" + alternate.interfaceProtocol.toString(16) + " )");
                        break;
                    case 0x0b:
                        console.log("\t\t\tAlternate Setting #" + alternate.alternateSetting + " : Smart Card Class ( 0x" + alternate.interfaceClass.toString(16) + " 0x" + alternate.interfaceSubclass.toString(16) + " 0x" + alternate.interfaceProtocol.toString(16) + " )");
                        break;
                    case 0x0d:
                        console.log("\t\t\tAlternate Setting #" + alternate.alternateSetting + " : Content Security Class ( Ox" + alternate.interfaceClass.toString(16) + " 0x" + alternate.interfaceSubclass.toString(16) + " 0x" + alternate.interfaceProtocol.toString(16) + " )");
                        break;
                    case 0x0e:
                        console.log("\t\t\tAlternate Setting #" + alternate.alternateSetting + " : Video Class ( Ox" + alternate.interfaceClass.toString(16) + " 0x" + alternate.interfaceSubclass.toString(16) + " 0x" + alternate.interfaceProtocol.toString(16) + " )");
                        break;
                    case 0x0f:
                        console.log("\t\t\tAlternate Setting #" + alternate.alternateSetting + " : Personal Healthcare Class ( Ox" + alternate.interfaceClass.toString(16) + " 0x" + alternate.interfaceSubclass.toString(16) + " 0x" + alternate.interfaceProtocol.toString(16) + " )");
                        break;
                    case 0x10:
                        console.log("\t\t\tAlternate Setting #" + alternate.alternateSetting + " : Audio/Video Devices Class ( Ox" + alternate.interfaceClass.toString(16) + " 0x" + alternate.interfaceSubclass.toString(16) + " 0x" + alternate.interfaceProtocol.toString(16) + " )");
                        break;
                    case 0x12:
                        console.log("\t\t\tAlternate Setting #" + alternate.alternateSetting + " : USB Type-C Bridge Class ( Ox" + alternate.interfaceClass.toString(16) + " 0x" + alternate.interfaceSubclass.toString(16) + " 0x" + alternate.interfaceProtocol.toString(16) + " )");
                        break;
                    case 0xdc:
                        console.log("\t\t\tAlternate Setting #" + alternate.alternateSetting + " : Diagnostic Class ( Ox" + alternate.interfaceClass.toString(16) + " 0x" + alternate.interfaceSubclass.toString(16) + " 0x" + alternate.interfaceProtocol.toString(16) + " )");
                        break;
                    case 0xe0:
                        console.log("\t\t\tAlternate Setting #" + alternate.alternateSetting + " : Wireless Controller Class ( Ox" + alternate.interfaceClass.toString(16) + " 0x" + alternate.interfaceSubclass.toString(16) + " 0x" + alternate.interfaceProtocol.toString(16) + " )");
                        break;
                    case 0xef:
                        console.log("\t\t\tAlternate Setting #" + alternate.alternateSetting + " : Miscellaneaous Class ( Ox" + alternate.interfaceClass.toString(16) + " 0x" + alternate.interfaceSubclass.toString(16) + " 0x" + alternate.interfaceProtocol.toString(16) + " )");
                        break;
                    case 0xff:
                        console.log("\t\t\tAlternate Setting #" + alternate.alternateSetting + " : Application Specific ( Ox" + alternate.interfaceClass.toString(16) + " 0x" + alternate.interfaceSubclass.toString(16) + " 0x" + alternate.interfaceProtocol.toString(16) + " )");
                        break;
                    default :
                        console.log("\t\t\tAlternate Setting #" + alternate.alternateSetting + " : Interface Class = Ox" + alternate.interfaceClass.toString(16) + " 0x" + alternate.interfaceSubclass.toString(16) + " 0x" + alternate.interfaceProtocol.toString(16));
                        break;
                }
                alternate.endpoints.forEach((endpoint, ix, ar) => {
                    console.log("\t\t\t\tEndpoint #" + endpoint.endpointNumber + " direction:" + endpoint.direction + " packetsize = " + endpoint.packetSize + " type = " + endpoint.type)
                })
            });
        });
    });
    console.log("")
});
