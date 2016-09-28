
class Greeter {
    element: HTMLElement;
    span: HTMLElement;
    timerToken: number;
    vm: any;

    constructor(element: HTMLElement) {
        this.element = element;
        this.element.innerHTML += "The time is: ";
        this.span = document.createElement('span');
        this.element.appendChild(this.span);
        this.span.innerText = new Date().toUTCString();
        var that = this;
        this.vm = {
            realtime: ko.observable(),
            arrays: ko.observableArray(),
            gifts: ko.observableArray(),
            
            addData: function () {
                this.arrays.push(this.realtime());
            },
            addGift : function () {
               this.gifts.push({
                    name: "",
                    price: ""
                });
            },

            removeGift: function (gift) {
                that.vm.gifts.remove(gift);
            },

            save : function (form) {
                alert("Could now transmit to server: " + ko.utils.stringifyJson(this.vm.gifts));
                // To actually transmit to server as a regular form post, write this: ko.utils.postJson($("form")[0], self.gifts);
            }
           
            //  this.vm.giftModel([{ name: "Kendo UI", price: "40$" }, { name: "BugZilla", price: "90$" }])
        }
        this.vm.gifts.push({ name: 'KendoUI', price: '40$' });
        this.vm.realtime("Real Time");
        this.vm.arrays.push("Real Time Data with Knockout JS");
        this.vm.arrays.push("RealTime Data");
        ko.applyBindings(this.vm, element);

    }

    start() {
        this.timerToken = setInterval(() => this.span.innerHTML = new Date().toUTCString(), 500);
    }

    stop() {
        clearTimeout(this.timerToken);
    }

}
class Gift {
    giftModel: any;
    viewModel: any;
    constructor(element) {
        this.giftModel = function (gifts) {
            var self = this;
            self.gifts = ko.observableArray(gifts);

            self.addGift = function () {
                self.gifts.push({
                    name: "",
                    price: ""
                });
            };

            self.removeGift = function (gift) {
                self.gifts.remove(gift);
            };

            self.save = function (form) {
                alert("Could now transmit to server: " + ko.utils.stringifyJson(self.gifts));
                // To actually transmit to server as a regular form post, write this: ko.utils.postJson($("form")[0], self.gifts);
            };
        }
        this.viewModel = new this.giftModel([{ name: "Kendo UI", price: "40$" }, { name: "BugZilla", price: "90$" }])
        // ko.applyBindings(this.viewModel);
    }


}

class Root {
    bind: any;
    constructor(greeter, gift, element) {
        this.bind = {
            vm: greeter.vm,
            viewModel: gift.viewModel
        }
        //ko.applyBindings(this.bind, element);
    }
}



window.onload = () => {
    var el = document.getElementById('content');
    var greeter = new Greeter(el);
    var el1 = document.getElementById("frmGift");
    var gift = new Gift(el1);
    var root = new Root(greeter, gift, el);
    greeter.start();
};