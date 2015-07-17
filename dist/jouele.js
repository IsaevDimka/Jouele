!function(e){"use strict";function t(e,t){this.$link=e,this.options=t,this.isPlaying=!1,this.totalTime=0,this.fullyLoaded=!1,this.fullTimeDisplayed=!1,this.waitForLoad=!1,this.init()}var n=function(e){var t=Math.round(e)%60,n=(Math.round(e)-t)%3600/60,a=(Math.round(e)-t-60*n)/3600;return(a?a+":":"")+(a&&10>n?"0"+n:n)+":"+(10>t?"0"+t:t)},a=function(e){return e.$container.find(".jouele-buffering").addClass("jouele-buffering_visible_true"),e},o=function(e){return e.$container.find(".jouele-buffering").removeClass("jouele-buffering_visible_true"),e},i=function(e,t){return e.fullyLoaded&&e.totalTime?!1:(t.seekPercent>=100?(e.fullyLoaded=!0,e.totalTime=t.duration):e.totalTime=t.seekPercent>0?t.duration:0,e.$container.find(".jouele-load-bar").css({width:Math.floor(Math.min(100,t.seekPercent))+"%"}),e)},l=function(e,t){return e.$container.find(".jouele-play-lift").css("left",t+"%"),e.$container.find(".jouele-play-bar").css("width",t+"%"),e},r=function(e,t){if(e.totalTime<=0)return!1;var a=n(t),o="";return e.fullyLoaded?e.fullTimeDisplayed||(o=n(e.totalTime),e.$container.find(".jouele-total-time").text(o),e.fullTimeDisplayed=!0):(o="~ "+n(e.totalTime),e.$container.find(".jouele-total-time").text(o)),(e.isPlaying||e.waitForLoad)&&e.$container.find(".jouele-play-time").text(a),e},s=function(e,t){var n=t.toFixed(2);return l(e,n),a(e),e.waitForLoad=!0,e.$jPlayer.jPlayer("playHead",n),e};e.fn.jouele=function(n){return this.each(function(){var a=e(this),o=a.data("jouele");o||new t(a,e.extend({},e.fn.jouele.defaults,n,a.data()))})},e.fn.jouele.defaults={swfPath:"./jplayer/",swfFilename:"jplayer.swf",supplied:"mp3",volume:1,scrollOnSpace:!1,pauseOnSpace:!0},t.prototype.init=function(){this.createDOM(),this.defineDeferred(),this.initPlayerPlugin(),this.bindEvents(),this.insertDOM()},t.prototype.destroy=function(){var t=this.$container.attr("id");return this.$container.after(this.$link).remove(),e(document).off("."+t),this.$link},t.prototype.pause=function(){return"undefined"!=typeof this.$jPlayer&&this.$jPlayer.jPlayer&&this.isPlaying&&this.$jPlayer.jPlayer("pause"),this},t.prototype.stop=function(){return"undefined"!=typeof this.$jPlayer&&this.$jPlayer.jPlayer&&this.isPlaying&&this.$jPlayer.jPlayer("stop"),this},t.prototype.play=function(){return"undefined"!=typeof this.$jPlayer&&this.$jPlayer.jPlayer&&(this.isPlaying||this.$jPlayer.jPlayer("play")),this},t.prototype.onPause=function(){this.isPlaying=!1,this.$container.removeClass("jouele-status-playing")},t.prototype.onStop=function(){this.isPlaying=!1,this.$container.removeClass("jouele-status-playing")},t.prototype.onPlay=function(){e(document).trigger("jouele-stop",this),this.$container.addClass("jouele-status-playing"),this.isPlaying=!0},t.prototype.createDOM=function(){var t=e(document.createElement("div")),n=e(document.createElement("div")),a=e(document.createElement("div")),o=e(document.createElement("div")),i=this.$link.text(),l=function(){return[e(document.createElement("a")).addClass("jouele-download jouele-hidden"),e(document.createElement("div")).addClass("jouele-play-control").append(e(document.createElement("div")).addClass("jouele-unavailable"),e(document.createElement("div")).addClass("jouele-play-pause jouele-hidden").append(e(document.createElement("div")).addClass("jouele-play"),e(document.createElement("div")).addClass("jouele-pause").css({display:"none"}))),e(document.createElement("div")).addClass("jouele-time").append(e(document.createElement("div")).addClass("jouele-play-time"),e(document.createElement("div")).addClass("jouele-total-time")),e(document.createElement("div")).addClass("jouele-name").html(i)]},r=function(){return e(document.createElement("div")).addClass("jouele-mine").append(e(document.createElement("div")).addClass("jouele-mine-bar"),e(document.createElement("div")).addClass("jouele-load-bar jouele-hidden"),e(document.createElement("div")).addClass("jouele-play-bar"),e(document.createElement("div")).addClass("jouele-play-lift jouele-hidden").append(e(document.createElement("div")).addClass("jouele-buffering")))};return this.$container=t.data("jouele",this).addClass("jouele").attr("id","jouele-ui-zone-"+(1e3+Math.round(8999*Math.random()))).append(n.addClass("jouele-invisible-object"),a.addClass("jouele-info-area").append(l()),o.addClass("jouele-progress-area").append(r())),this},t.prototype.defineDeferred=function(){var t=this;return this.domReady=e.Deferred(),this.playerReady=e.Deferred(),e.when(this.domReady,this.playerReady).done(function(){delete t.domReady,delete t.playerReady,t.definePlayerSelectors(),e(document).trigger("jouele-ready",this)}),this},t.prototype.initPlayerPlugin=function(){var t=this,n=t.$container.find(".jouele-invisible-object");return this.$jPlayer=n.jPlayer({solution:"html,flash",preload:"metadata",errorAlerts:!1,swfPath:t.options.swfPath+t.options.swfFilename,supplied:t.options.supplied,volume:t.options.volume,ready:function(){var a=t.$link.attr("href"),o=t.$container.attr("id"),i=!1;n.jPlayer("setMedia",{mp3:a}),t.$container.find(".jouele-download").attr("href",a),t.$container.find(".jouele-hidden").removeClass("jouele-hidden"),t.$container.find(".jouele-unavailable").addClass("jouele-hidden"),t.$container.find(".jouele-mine").on("mousedown."+o,function(n){if(1!==n.which)return!1;n.stopPropagation(),n.preventDefault();var a=e(this),l=(n.pageX-a.offset().left)/a.width()*100;i=!0,e(document).off("mouseup."+o).on("mouseup."+o,function(){i=!1}),e(document).off("mousemove."+o).on("mousemove."+o,function(e){if(e.stopPropagation(),e.preventDefault(),!i)return!1;var n=(e.pageX-a.offset().left)/a.width()*100;s(t,n)}),s(t,l)}),t.playerReady.resolve()},pause:function(){t.onPause.call(t)},stop:function(){t.onStop.call(t)},play:function(){t.onPlay.call(t)},progress:function(e){i(t,e.jPlayer.status),r(t,e.jPlayer.status.currentTime)},timeupdate:function(e){i(t,e.jPlayer.status),r(t,e.jPlayer.status.currentTime),l(t,e.jPlayer.status.currentPercentAbsolute.toFixed(2)),t.waitForLoad&&(t.waitForLoad=!1,t.$jPlayer.jPlayer("play"),o(t))}}),this},t.prototype.insertDOM=function(){return this.$link.after(this.$container),this.$link.detach(),this.domReady.resolve(),this},t.prototype.definePlayerSelectors=function(){return this.$jPlayer.jPlayer("option","cssSelectorAncestor","#"+this.$container.attr("id")),this.$jPlayer.jPlayer("option","cssSelector",{play:".jouele-play",pause:".jouele-pause"}),this},t.prototype.bindEvents=function(){var t=this,n=t.$container.attr("id");return e(document).on("jouele-stop."+n,function(){t.isPlaying&&t.$jPlayer.jPlayer("pause")}),e(document).on("keydown."+n,function(e){32===e.keyCode&&t.isPlaying&&t.options.pauseOnSpace&&(t.options.scrollOnSpace||(e.stopPropagation(),e.preventDefault()),t.$jPlayer.jPlayer("pause"))}),this};var u=function(){e(".jouele").jouele()};e(u)}(jQuery);