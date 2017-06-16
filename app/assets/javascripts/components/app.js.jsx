var App = React.createClass ({
  getInitialState: function () {
    return {
      offSet: 0,
      rows: this.props.data,
      options:{
  			leftBound: moment().set({hour: 0, date: 1, month: 5, year: 2017}).toDate(),
  			rightBound: moment().set({hour: 0, date: 31, month: 9, year: 2017}).toDate(),
  			labelWidth: '120px',
  			maxIntervalWidth: 150,
  			showBorders: false,
  			intervalFormat: 'YYYY MM DD',
		  },
  	 groups:[
  			{
  				id: 'myTasks',
  				title: 'My Tasks'
  			}
  		]
    };
  },
  reposition(){
      console.log("NEW POSITION get: " );
      var rows = this.state.rows.slice();
    for (i = 0; i< rows.length; i++){
        rows[i].position = i;


        $.ajax({ url: `/tasks/${rows[i].id}`,
                  type: 'PUT',
                  dataType: 'JSON',
                  data:{task:rows[i]},
                  success:() => {
                     console.log('successfully removed item');
                      // this.props.updateRecords(arr);
                   }
                 });
               }
      this.setState({rows: rows});
  },
  addRecord(row){
    console.log("ADDING RECORD");
    var rows = this.state.rows.slice();
    rows.push(row);
    this.setState({rows: rows});
  },
  updateRecords(rows){
    this.setState({rows: rows}, this.sortedItems);
    console.log("UPDATE ROWS");
    this.reposition();
  },
  deleteRecord(id){
    var newItems = this.state.rows.filter((item) =>
    { return item.id != id; });
    this.setState({ rows: newItems });
    this.reposition();
  },
  componentWillMount() {

    this.sortedItems();
  },
  sortedItems() {
      // sortBy provided by https://lodash.com
      console.log("SORTEDDDDDD");
      var rowsSorted = _.sortBy(this.state.rows, 'position');
      this.setState( {
        rows: rowsSorted
      })
  },
render() {

  return (
			<div className="container">
        <TaskForm handleNewRecord = {this.addRecord} numberRows = {this.state.rows.length} start = {this.state.options.leftBound} end = {this.state.options.rightBound}/>
				<Task offset = {this.state.offSet} updateRecords={this.updateRecords}  options={this.state.options} groups={this.state.groups} rows={this.state.rows} handleDeleteRecord= {this.deleteRecord} />
        <ul>
          <li>Date range of project range is prefixed for -> 2017-06-01 ~ 2017-10-31</li>
          <li>Date Marker is calculated in scale, responsive with the width of table </li>
          <li>Drag Title of Task to switch between rows</li>
          <li>Drag middle of task bar to move on it's row</li>
          <li>Drag Left + right edge of task bar to resize (Animation on left side was throwing everything off so I had to turn it off.) </li>
          <li>Each 'Snap' represent one day. This width of snap area is responsive against the table's width.</li>
          <li>Everything is saved per action. </li>
        </ul>

      </div>
		);

}


});
