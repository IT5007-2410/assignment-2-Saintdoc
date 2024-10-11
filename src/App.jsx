/*Q1. JS Variable needs to be created here. Below variable is just an example. Try to add more attributes.*/
const initialTravellers = [
  {
    id: 1, name: 'Jack', phone: 88885555, email: "jack@email.com",
    bookingTime: new Date(), seat: '1A',
  },
  {
    id: 2, name: 'Rose', phone: 88884444, email: "rose@email.com",
    bookingTime: new Date(), seat: '3B',
  },
  {
    id: 3, name: 'Titanic', phone: 88886666, email: "titanic@email.com",
    bookingTime: new Date(), seat: '15C',
  },
];

let idCounter = 3; 

function TravellerRow(props) {
  {/*Q3. Placeholder to initialize local variable based on traveller prop.*/}
  const {id, name, phone, email, bookingTime, seat} = props.onerow;
  return (
    <tr>
	  {/*Q3. Placeholder for rendering one row of a table with required traveller attribute values.*/}
      <td>{id}</td>
      <td>{name}</td>
      <td>{phone}</td>
      <td>{email}</td>
      <td>{bookingTime.toISOString()}</td>
      <td>{seat}</td>
    </tr>
  );
}

function Display(props) {
  
	/*Q3. Write code to render rows of table, reach corresponding to one traveller. Make use of the TravellerRow function that draws one row.*/

  return (
    <table className="bordered-table">
      <thead>
        <tr>
	  {/*Q3. Below table is just an example. Add more columns based on the traveller attributes you choose.*/}
          <th>ID</th>
          <th>Name</th>
          <th>Phone</th>
          <th>Email</th>
          <th>Booking Time</th>
          <th>Seat</th>
        </tr>
      </thead>
      <tbody>
        {/*Q3. write code to call the JS variable defined at the top of this function to render table rows.*/}
        {props.travellers.map(onetraveller => (<TravellerRow key={onetraveller.id} onerow={onetraveller}/>))}
      </tbody>
    </table>
  );
}

class Add extends React.Component {
  constructor() {
    super();
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    /*Q4. Fetch the passenger details from the add form and call bookTraveller()*/
    const form = document.forms.addTraveller;
    const name = form.travellername.value;
    const phone = form.travellerphone.value;
    const email = form.travelleremail.value;
    const bookingTime = new Date(form.travellerbookingtime.value);
    const seat = form.travellerseat.value;
    console.log(name, phone, email, bookingTime, seat);
    //code to add the traveller.
    this.props.addfun({name: name, phone: phone, email: email, bookingTime: bookingTime, seat: seat});
  }

  render() {
    return (
      <form name="addTraveller" onSubmit={this.handleSubmit}>
	    {/*Q4. Placeholder to enter passenger details. Below code is just an example.*/}
        <input type="text" name="travellername" placeholder="Name" required/>
        <input type="tel" name="travellerphone" placeholder="Phone" pattern="[0-9]*" required />
        <input type="email" name="travelleremail" placeholder="Email" required/>
        <input type="datetime-local" name="travellerbookingtime" placeholder="Booking Time" required/>
        <input type="text" name="travellerseat" placeholder="Seat" required/>
        <button>Add</button>
      </form>
    );
  }
}


class Delete extends React.Component {
  constructor() {
    super();
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleSubmit(e) {
    e.preventDefault();
    /*Q5. Fetch the passenger details from the deletion form and call deleteTraveller()*/
    const form = document.forms.deleteTraveller;
    console.log(form.travellername.value);
    //code to delete the traveller.
    this.props.deletefun(form.travellername.value);
  }

  render() {
    return (
      <form name="deleteTraveller" onSubmit={this.handleSubmit}>
	    {/*Q5. Placeholder form to enter information on which passenger's ticket needs to be deleted. Below code is just an example.*/}
	      <input type="text" name="travellername" placeholder="Name" />
        <button>Delete</button>
      </form>
    );
  }
}

class Homepage extends React.Component {
	constructor() {
	super();
	}
	render(){
	return (
	<div>
		{/*Q2. Placeholder for Homepage code that shows free seats visually.*/}
	</div>);
	}
}
class TicketToRide extends React.Component {
  constructor() {
    super();
    this.state = { travellers: [], selector: 1};
    this.bookTraveller = this.bookTraveller.bind(this);
    this.deleteTraveller = this.deleteTraveller.bind(this);
  }

  setSelector(value)
  {
  	/*Q2. Function to set the value of component selector variable based on user's button click.*/
  }
  componentDidMount() {
    this.loadData();
  }
  componentDidUpdate()
  {
    console.log("componentDidUpdate()", this.state.travellers);
  }

  loadData() {
    setTimeout(() => {
      this.setState({ travellers: initialTravellers });
    }, 500);
  }

  bookTraveller(passenger) {
	    /*Q4. Write code to add a passenger to the traveller state variable.*/
      console.log("bookTraveller:", passenger);
      //actual addition
      idCounter++;
      const newTraveller = {id: idCounter, ...passenger};
      this.setState({travellers:[...this.state.travellers, newTraveller]});
  }

  deleteTraveller(passenger) {
	  /*Q5. Write code to delete a passenger from the traveller state variable.*/
    console.log("deleteTraveller:", passenger);
    //actual deletion
    var newlist = [];
    this.state.travellers.forEach(element => {
      if (element.name != passenger){newlist.push(element)}
    });
    this.setState({travellers: newlist})
  }
  render() {
    return (
      <div>
        <h1>Ticket To Ride</h1>
	<div>
	    {/*Q2. Code for Navigation bar. Use basic buttons to create a nav bar. Use states to manage selection.*/}
	</div>
	<div>
		{/*Only one of the below four divisions is rendered based on the button clicked by the user.*/}
		{/*Q2 and Q6. Code to call Instance that draws Homepage. Homepage shows Visual Representation of free seats.*/}
		{/*Q3. Code to call component that Displays Travellers.*/}
		<Display travellers={this.state.travellers}/>
		{/*Q4. Code to call the component that adds a traveller.*/}
    <Add addfun={this.bookTraveller}/>
		{/*Q5. Code to call the component that deletes a traveller based on a given attribute.*/}
    <Delete deletefun={this.deleteTraveller}/>
	</div>
      </div>
    );
  }
}

const element = <TicketToRide />;

ReactDOM.render(element, document.getElementById('contents'));
