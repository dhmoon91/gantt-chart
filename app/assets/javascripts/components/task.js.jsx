
var Task = React.createClass({
  getInitialState: function () {
    return{
      tableId: 'random',
    };
  },

  updateDateOnMove: function (dayChange, rowPos) {
    console.log("POSITION");
    console.log(rowPos);
      var arr = this.props.rows.slice();
      arr[rowPos].startDate = moment(arr[rowPos].startDate).add(dayChange,'days').toDate();
      arr[rowPos].endDate = moment(arr[rowPos].endDate).add(dayChange,'days').toDate();
      $.ajax({ url: `/tasks/${arr[rowPos].id}`,
                type: 'PUT',
                dataType: 'JSON',
                data:{task:arr[rowPos]},
                success:() => {
                   console.log('successfully Updated item');
                    this.props.updateRecords(arr);
                 }
               });
      this.showPopup(arr[rowPos]);
  },
  updateDateOnDrag: function(startChange, endChange ,rowPos) {
  console.log("POSITION");
    console.log(rowPos);
      var arr = this.props.rows.slice();
      arr[rowPos].startDate = moment(arr[rowPos].startDate).add(startChange,'days').toDate();
      arr[rowPos].endDate = moment(arr[rowPos].endDate).add(endChange,'days').toDate();

      $.ajax({ url: `/tasks/${arr[rowPos].id}`,
                type: 'PUT',
                dataType: 'JSON',
                data:{task:arr[rowPos]},
                success:() => {
                   console.log('successfully Updated item');
                    this.props.updateRecords(arr);
                 }
               });


      this.showPopup(arr[rowPos]);
  },
  handleDelete: function(id) {
      $.ajax({ url: `/tasks/${id}`,
                type: 'DELETE',
                success:() => {
                   console.log('successfully removed item');
                   this.props.handleDeleteRecord(id);
                 }
               });

  },
  renderBar(row) {
      var difference = moment(this.props.options.leftBound).unix();
      var rightBound = moment(this.props.options.rightBound).unix() - difference;
      var startDate = moment(row.startDate).unix() - difference;
      if (startDate < 0) {
        startDate = 0;
      } else if (startDate > rightBound) {
        startDate = rightBound;
      }

      var endDate = moment(row.endDate).unix() - difference;
      if (endDate < 0) {
        endDate = 0;
      } else if (endDate > rightBound) {
        endDate = rightBound;
      }
      var leftPadWidth = (startDate / rightBound * 100) + '%';
      var divWidth = ((endDate - startDate) / rightBound * 100) + '%';
      var rightPadWidth = ((rightBound - endDate) / rightBound * 100) + '%';
      var divBackgroundColor = '#429ef4';
      var scale = document.querySelector('#' + this.state.tableId + ' thead td:nth-child(2)');
      var allWidth = scale.offsetWidth;
      console.log("OFF SET WIDTH IN BAR RENDER: " + allWidth);
      var temp = parseInt(divWidth,10);
      var originalWidth = ((temp/100) * allWidth ) ;

      var bar = {
      marginTop: '2px',
      marginBottom: '2px',
      marginLeft: leftPadWidth,
      marginRight: rightPadWidth,
      backgroundColor: divBackgroundColor,
      width: divWidth,
      float: 'left',
      height: '30px',
      borderRadius: '10px',
      boxShadow: '2px 2px 4px #000000'
      };

      //Draggable area in the middle of bar
      var drag = {
        marginLeft: '25%',
        marginRight: '25%',
        width: '50%',
        backgroundColor: divBackgroundColor,
        float: 'left',
        height: '30px',
        cursor: 'move'
      }
      var timelineStyle = {
        width: '100%'
      }


      return (
      // <Resize  barWidth ={this.props.options.oneBarWidth} style= {bar} drag={drag}>

        <td  id = "restrict" style={timelineStyle} >
          <div onMouseOver={this.showPopup.bind(null,row)} onMouseOut={this.hidePopup}>
           <ResizeBar  updateDateOnMove={this.updateDateOnMove} updateDateOnDrag={this.updateDateOnDrag} rowPos = {row.position} firstWidth= {originalWidth}  barWidth ={this.state.dayWidth} style= {bar} drag={drag}>
           </ResizeBar>
          </div>
      </td>


      );
  },

	renderRows() {
  		var rows = [];
  		var labelWidth = '80px';
  		if (this.props.options && this.props.options.labelWidth) {
  			labelWidth = this.props.options.labelWidth;
  		}
  		var titleStyle = {
  			textAlign: 'right',
  			verticalAlign: 'middle',
  			paddingRight: '10px',
  			fontWeight: 'bold',
          cursor: 'pointer'
  		};
      var timelineStyle = {
        width: '100%'
      };

  		if (this.props.options.showBorders !== false) {
  			titleStyle.border = 'solid';
  			timelineStyle.border = 'solid';
  		}
  		var labelStyle = {
  			width: labelWidth
  		};
        // console.log("length of rows data " + this.props.rows.length);
  		if (this.props.rows.length > 0) {
  			for(var i = 0; i < this.props.rows.length; i++) {
  				var rowObject = this.props.rows[i];
  				var row = (
            <tr  data-id={rowObject.id} key={i} >
  						<td  id="title" style={titleStyle}>
  							<div style={labelStyle}>{rowObject.title}</div>
                <button className="btn btn-danger btn-xs" onClick= {this.handleDelete.bind(null,rowObject.id)}>DELETE</button>
  						</td>
    							{this.renderBar(rowObject)}
  					</tr>
  				);
  				rows.push(row);
  			}
  		} else {
  			var row = (
  				<tr key={0}>
  					<td style={titleStyle}>
  						<div style={labelStyle} />
  					</td>
  					<td style={timelineStyle}>
  						<span>No Data</span>
  					</td>
  				</tr>
  			);

  			rows.push(row);
  		}
      this.setState({rows:rows});
  	},

	showPopup(row) {
			var popover = document.querySelector('#' + this.state.tableId + ' .popover');
			popover.innerHTML = `<div class="card-block">
					<h3 class="card-title">` + row.title + `</h3>
					<h6><b>Start Date</b>: ` + moment(row.startDate).format('MMMM Do') + `</h6>
					<h6><b>End Date</b>: ` + moment(row.endDate).format('MMMM Do') + `</h6>
				</div>`;
			popover.style.left = this.mouseX + 20 + 'px';
			popover.style.top = this.mouseY - 10 + 'px';
			popover.style.display = 'inline';
	},

  hidePopup() {
		var popover = document.querySelector('#' + this.state.tableId + ' .popover');
		popover.style.display = 'none';
	},


  drawScale() {
  	var leftBound = this.props.options.leftBound;
  	var rightBound = this.props.options.rightBound;
  	var minutes = 0;
  	var hours = 0;
  	var days = 0;
  	var weeks = 0;
  	var months = 0;
  	var years = moment(rightBound).diff(moment(leftBound), 'years');
  	if (years < 2) {
  		var months = moment(rightBound).diff(moment(leftBound), 'months');
  		if (months < 6) {
  			var days = (moment(rightBound).unix() - moment(leftBound).unix()) /24 / 60 / 60;
  				this.setState({scale: this.calculateScale(days, 'days')});
  		} else {
  			this.setState({scale: this.calculateScale(months, 'months')});
  		}
  	} else {
  		this.setState({scale: this.calculateScale(years, 'years')});
  	}
	},

  calculateScale(count, type) {
		var options = this.props.options;
		var difference = moment(options.leftBound).unix();
		var widthByTime = moment(options.rightBound).unix() - difference;
		var scale = document.querySelector('#' + this.state.tableId + ' thead td:nth-child(2)');
    var offset = this.state.offSetW;

    if (this.state.offSetW == 0){
      console.log(this.state.offSetW);
      offset = 122;
    }
    var widthByPixels = scale.offsetWidth;
    console.log("OFF SET WIDTH IN Draw SACLE: " + widthByPixels);
		var markersCount = Math.round(widthByPixels / 100);
		var unitByPixels = widthByPixels / count;
    this.setState({dayWidth: Math.round(unitByPixels)},this.renderRows);
		var maxIntervalWidth = 100;
		if (options.maxIntervalWidth) {
			maxIntervalWidth = options.maxIntervalWidth;
		}
		var unitsPerInterval = 1;
		if (maxIntervalWidth > unitByPixels) {
			unitsPerInterval = Math.floor(maxIntervalWidth / unitByPixels);
		}
		var intervalByPixels = unitsPerInterval * unitByPixels;
		var markersCount = Math.floor(widthByPixels / intervalByPixels);
		var intervalByPercent = intervalByPixels / widthByPixels * 100;
		var markers = [];
		var style = {
			margin: '0px',
			padding: '0px',
			width: intervalByPercent + '%',
			float: 'left',
			borderLeft: 'solid',
			borderWidth: '4px',
      borderColor: '#214c91',
			paddingLeft: '5px'
		};


		for (var i = 0; i < markersCount; i++) {
			var date = moment(difference * 1000);
			var formattedInterval;
			switch (type) {
				case 'years':
					date.add(i * unitsPerInterval, 'years');
					formattedInterval=date.format('YYYY MM DD');
					break;
				case 'months':
					date.add(i * unitsPerInterval, 'months');
					formattedInterval=date.format('YYYY MM DD');
					break;
				case 'days':
					date.add(i * unitsPerInterval, 'days');
					formattedInterval=date.format('YYYY MM DD');
					break;
				case 'hours':
					date.add(i * unitsPerInterval, 'hours');
					formattedInterval=date.format('H:mm');
				case 'minutes':
					date.add(i * unitsPerInterval, 'minutes');
					formattedInterval=date.format('H:mm:ss');
				default:
			}
			if (options && options.intervalFormat){
				formattedInterval = date.format(options.intervalFormat);
			}
			var mark = (
				<div key={i} style={style}>
					{ formattedInterval }
				</div>
			);
			markers.push(mark);
		}
		return (
			<div>
				{markers}
			</div>
		);
	},


  componentDidUpdate() {
    if (this.previousProps.options !== this.props.options || this.previousProps.rows !== this.props.rows) { // prevents infinite loop
      this.previousProps = this.props;
      this.drawScale();
    }
  },
  componentDidMount() {
    // var offset = ;
    this.previousProps = this.props;
    this.drawScale();

    document.onmousemove = (e) => {
        this.mouseX = e.pageX;
        this.mouseY = e.pageY;
      };
      $(ReactDOM.findDOMNode(this)).sortable({
          items: 'tr',
          update: this.handleSortableUpdate,
           handle: '#title'
        });
        console.log("RENDER Finished");
          console.log("");
    },
    handleSortableUpdate() {
      var newRows = _.clone(this.props.rows, true);
      var $node = $(ReactDOM.findDOMNode(this));
      var ids = $node.sortable('toArray', { attribute: 'data-id' });
      ids.forEach(function (id, i){
          //  console.log( "IDSSS" + id);
        newRows.forEach(function(row,j){
          // console.log( "ROW" + row);
          if ( row.id == id){
            row.position = (i-1);
          }
        })
      })
     // Lets React reorder the DOM
     $node.sortable('cancel');
      this.props.updateRecords(newRows);
  	},
    handleTableResize() {
      this.drawScale();
    },

  render: function () {
    var tableStyle = {
			width: '100%',
      marginTop: '20px'
		};
		var scaleStyle = {
			width: '100%'
		};
		var popoverStyle = {
			position: 'absolute',
			display: 'none'
		};

    return (
				<div id={this.state.tableId} >
					<div className="popover card" style={popoverStyle} />
            <ResizeTable  updateTable={this.handleTableResize} >
    					<table style={tableStyle} className='table table-bordered' >
    						<thead>
    							<tr>
    								<td />
    								<td style={scaleStyle}>{this.state.scale}</td>

    							</tr>
    						</thead>
    						<tbody>
    							{/* {this.renderRows()} */}
                  {this.state.rows}
    						</tbody>

    					</table>
              <p>Drag this bar to resize width of table</p>
              <hr/>

          </ResizeTable>
        </div>
			);
  }
});

Task.propTypes = {
	groups: React.PropTypes.array,
	options: React.PropTypes.object,
	rows: React.PropTypes.array,
};

Task.defaultProps = {
	groups: {},
	options: {},
	rows: {},
};
