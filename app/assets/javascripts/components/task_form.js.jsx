var TaskForm = React.createClass({
  getInitialState: function(){
    return {
    id:'',
    title:'',
    position: '',
    startDate:'',
    endDate:''}
  },
  valid: function () {

      return (this.state.title && this.state.startDate && this.state.endDate);
  },
  handleChange: function(e) {
    var name = e.target.name;
    var obj = {};
    obj[name] = e.target.value;
    this.setState(obj);
  },
  handleSubmit: function(e){
    e.preventDefault();
    var leftbound =   moment(this.props.start).unix();
// moment(this.props.start).unix();
    var inputStart = moment(this.state.startDate).unix();
    var rightbound =  moment(this.props.end).unix();
    var inputEnd = moment(this.state.endDate).unix();
    console.log("SUBMITTED");
    if(inputStart<leftbound || rightbound <inputEnd){
      alert("Invalid Date range input");
      this.setState(this.getInitialState());
    } else{
      this.setState ({
         position: this.props.numberRows
      },this.postData);
    }

  },
  postData:function () {

    console.log()
    $.post('tasks#create', {task: this.state}, function (data){
       this.props.handleNewRecord(data);
       this.setState(this.getInitialState());
     }.bind(this), 'JSON');
  },
  render: function() {
    return (
      <form className='form-inline' onSubmit={this.handleSubmit}>
        <div className='form-group'>
          <input type = 'text' className='form-control'
                      placeholder='Name of task' name='title' value={this.state.title} onChange ={this.handleChange}>
          </input>
        </div>
        <div className='form-group'>
          <input type = 'date' className='form-control'
                      placeholder='start date' name='startDate' value={this.state.startDate} onChange ={this.handleChange}>
          </input>
        </div>
        <div className='form-group'>
          <input type = 'date' className='form-control'
                      placeholder='end date' name='endDate' value={this.state.endDate} onChange ={this.handleChange}>
          </input>
        </div>
        <div className='form-group'>
          <input type = 'submit' className='btn btn-primary'
                  disabled = {!this.valid()}>
          </input>
        </div>

      </form>
    )
  }
})
