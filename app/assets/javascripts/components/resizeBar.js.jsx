var ResizeBar = React.createClass({

  getInitialState: function () {
    return{
      newWidth: 0,
      movedLeft: 0
    };
  },
  componentDidMount() {
    var that = this;
    var totalMoved = 0;
    var totalLeft = 0;
    var originalW = 0;
    var newW = 0;
     this.interactable = interact(ReactDOM.findDOMNode(this));

     this.interactable
     .draggable({
       inertia: true,
       restrict: {
           restriction: 'parent',
           elementRect: { top: 0, left: 0, bottom: 1, right: 1 },
               // endOnly:true
         },
       snap: {
           targets: [
             interact.createSnapGrid({ x: this.props.barWidth})
           ],
           range: Infinity,
           relativePoints: [{x:0}]
         },
      onend: function (e){
        // console.log("TOTAL MOVED: "+ totalMoved);
         that.updateDateOnMove(totalMoved);
        totalMoved = 0 ;

      },
       onmove:function(e){
        var target = e.target;
        totalMoved += e.dx;
        // console.log(totalMoved);
        x = (parseFloat(target.getAttribute('data-x')) || 0);

   target.style.webkitTransform =
   target.style.transform =
     'translate(' + x+ 'px)';
   //
  //  // update the posiion attributes
    target.setAttribute('data-x', x);

       }
     })
     .resizable({
        edges: { left: true, right: true, bottom: true, top: true },
        restrict: {
            restriction: 'parent',
            elementRect: { top: 0, left: 0, bottom: 1, right: 1 },
                // endOnly:true
          },
          snap: {
              targets: [
                interact.createSnapGrid({ x: this.props.barWidth})
              ],
              range: Infinity
            },
          onstart: function(e) {
              e.target.setAttribute('resizing', true);
              //  console.log("ORIGINAL WIDHT? " + e.target.style.width);
              originalW = e.target.style.width;
            },
            onend: function(e) {
                e.target.setAttribute('resizing', false);
                  // console.log('MOVED right: ' + e.target.style.width);
                newW = e.target.style.width;
                e.interactable.off('move');
                // console.log('MOVEDLEFT: ' +totalLeft);
                that.updateDateDrag(totalLeft,originalW,newW );
                totalLeft = 0;
                newW = 0;
              }
     })
     .on ('resizemove', function (event) {
        var target = event.target,
        x = (parseFloat(target.getAttribute('data-x')) || 0),
        y = (parseFloat(target.getAttribute('data-y')) || 0);

        // update the element's style
        target.style.width  = event.rect.width + 'px';
        target.style.height = event.rect.height + 'px';

        // translate when resizing from top or left edges
        x += event.deltaRect.left;
        y += event.deltaRect.top;

        target.style.webkitTransform = target.style.transform =
            'translate(' + x + 'px,' + y + 'px)';
        // console.log("LEFt" + event.deltaRect.left);
         totalLeft += event.deltaRect.left
        target.setAttribute('data-y', y);
        // target.textContent = Math.round(event.rect.width) + '×' + Math.round(event.rect.height);
    });
  },
  updateDateOnMove: function(moved){
    var dayChange = Math.round(moved/this.props.barWidth);
  // console.log("CHANGE DATE" + dayChange);
    this.props.updateDateOnMove(dayChange, this.props.rowPos);
  },
   updateDateDrag: function(left, originalWidth, newWidth){
      var startDayChange = 0;
      var endDayChange =0;
        if(left != 0){
          startDayChange =  Math.round(left/this.props.barWidth);
        } else {
          if (hasPct = originalWidth.indexOf('%') >= 0)
          {
            originalWidth = this.props.firstWidth;
            parseNW = parseInt(newWidth,10);
            endDayChange = Math.round ((parseNW-originalWidth) / this.props.barWidth );

          }else{
              parseOW = parseInt(originalWidth,10);
              parseNW = parseInt(newWidth,10);
              endDayChange = (parseNW-parseOW) / this.props.barWidth;

          }
        }
    this.props.updateDateOnDrag(startDayChange,endDayChange,this.props.rowPos);
  },




  render() {
    return (

         <div style= {this.props.style}>
              <span style={this.props.drag}></span>
        </div>



  );
  }

});
