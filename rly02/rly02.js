'use strict'
const connectButton = document.getElementById("connectButton");
const disconnectButton = document.getElementById("disconnectButton");
const colourPicker = document.getElementById("colourPicker");
const colourButton = document.getElementById("colourButton");

const connect = document.getElementById("connect");
const deviceHeartbeat = document.getElementById("deviceHeartbeat");
const deviceButtonPressed = document.getElementById("deviceButtonPressed");

const filters = [
	{ vendorId: 0x04d8, productId: 0xffee }, // RLY02
]



connectButton.onclick = async () => {
	navigator.usb.requestDevice({ filters: filters }).then(device => {
		device.open()
			.then(() => device.reset()
			.then(() => device.selectConfiguration(1)
			.then(() => device.claimInterface(1)
			.then(() => device.transferOut(3, new Uint8Array([90]))
			.then(() => device.transferIn(3,2)
			.then(receivedData => {
				console.log(receivedData.status);
				console.log(receivedData.data.getUint8(0)+ " : " +  receivedData.data.getUint8(1))
			})
			.then(() => device.transferOut(3, new Uint8Array([100]))
			.then(() => device.transferOut(3, new Uint8Array([91]))
			.then(() => device.releaseInterface(1)
				.then(() => device.close())))))))))
	})
		.catch(error => { console.log(error);});

}

