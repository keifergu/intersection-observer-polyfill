function IntersectionObserver(observer) {
  this.observer = observer;
  this.entries = [];

  initObserver.call(this);
}

IntersectionObserver.prototype = {
  observe: function(element) {
    this.entries.push(new IntersectionObserverEntry(element));
  }
}

function initObserver() {
  var that = this;
  var offset = {
    x: window.innerWidth,
    y: window.innerHeight
  };
  document.addEventListener("scroll", function() {
    var flag = false;
    that.entries.forEach(function(entry) {
      var rect = entry.boundingClientRect;
      if(rect.y < offset.y && rect.x < offset.x) {
        if(entry.intersectionRatio === 0) flag = true;
        entry.intersectionRatio = 1;
      } else {
        entry.intersectionRatio = 0;
      }
    })

    if(flag) {
      that.observer.call(null, that.entries);
    }
  })
}

function IntersectionObserverEntry(element) {
  this.intersectionRatio = 0;
  this.target = element;
  this.boundingClientRect = element.getBoundingClientRect();
}