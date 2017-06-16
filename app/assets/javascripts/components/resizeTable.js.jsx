var ResizeTable = React.createClass({


  componentDidMount() {
    var that = this;
    var newW = 0;
     this.interactable = interact(ReactDOM.findDOMNode(this));
     this.interactable.resizable({
      edges: {
        top:true,
        right: true,
        bottom: true
      },
      onstart: function(e) {
        e.target.setAttribute('resizing', true);
      },
      onend: function(e) {
        e.target.setAttribute('resizing', false);
        e.interactable.off('move');
        that.props.updateTable();

      },
      onmove: function (event) {
        var target = event.target,
        x = (parseFloat(target.getAttribute('data-x')) || 0),
         y = (parseFloat(target.getAttribute('data-y')) || 0);
          // console.log('ORGINAL RIGHT: ' + target.style.width);
          // console.log('MOVED RIGHT: ' + event.rect.width);
        target.style.width  = event.rect.width + 'px';
        target.style.height = event.rect.height + 'px';

        x += event.deltaRect.left;
         y += event.deltaRect.top;

         console.log('resize right: ' + target.style.width);
          console.log('resize bottom: ' +   target.style.height);

          target.style.webkitTransform = target.style.transform =
                  'translate(' + x + 'px,' + y + 'px)';
              target.setAttribute('data-x', x);
              target.setAttribute('data-y', y);


       }
    });


  },

  render() {
    return (
    <div>
      {this.props.children}
    </div>

  );
  }

});
