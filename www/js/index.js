var socket = io.connect('http://' + config.address + ':' + config.port);
var app = {
    team: null,
    initialize: function() {
        this.bindEvents();
    },
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
        document.querySelector('.trigger').onclick = function(event){
            app.team = event.target.value;
        };
    },
    onDeviceReady: function() {
        shake.startWatch(function(){
            console.log('Shake it !');
            var prize = null;
            var rand = Math.random();
            if(rand < .33){
                prize = '1 bouteille de Coca-Cola';
            } else if(rand > .66){
                prize = '1 place pour France - Angleterre';
            }else {
                prize = 'des gateaux';
            }

            var resultElement = document.querySelector('.result');
            resultElement.setAttribute('style', 'display:block;');
            resultElement.textContent = 'Vous avez gagné ' + prize + '!';

            if(typeof(app.team) !== null){
                console.log(app.team);
                socket.emit('vote', app.team);
            }

            cordova.plugins.notification.local.schedule({
                id: 10,
                title: 'Coca-Cola',
                text: 'Vous avez gagné ' + prize + '!',
            });
        }, 10);
    }
};

app.initialize();