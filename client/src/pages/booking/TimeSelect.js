import React, { Component } from "react";
import { Grid, Box, Container, Button } from "@material-ui/core";
import { get30DaysFromNow } from "../../utils/Utils";
import { connect } from "react-redux";
import { dateSelected, setStep } from "../../redux/actions";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { getTimeString } from "../../utils/Utils";

class TimeSelect extends Component {
	state = {
		days: [],
		times: [
			{
				from: 8,
				to: 9
			},
			{
				from: 9,
				to: 10
			},
			{
				from: 10,
				to: 11
			},
			{
				from: 11,
				to: 12
			},
			{
				from: 12,
				to: 13
			},
			{
				from: 13,
				to: 14
			},
			{
				from: 14,
				to: 15
			},
			{
				from: 15,
				to: 16
			},
			{
				from: 16,
				to: 17
			},
			{
				from: 17,
				to: 18
			},
			{
				from: 18,
				to: 19
			},
			{
				from: 19,
				to: 20
			}
		]
	};

	componentWillMount() {
		const { vehicles, selectedVehicle, setStep } = this.props;
		setStep(4);
		let days = get30DaysFromNow();
		let showDays = [days[0], days[1], days[2], days[3], days[4]];
		this.setState({
			days: days,
			showDays: showDays,
			moreOrLess: true
		});
		if (selectedVehicle) {
			this.setState({
				selectedVehicleIndex: vehicles.indexOf(selectedVehicle)
			});
		}
	}

	onClickMore = () => {
		this.setState({
			showDays: this.state.days,
			moreOrLess: false
		});
	};

	onClickLess = () => {
		const { days } = this.state;
		let showDays = [days[0], days[1], days[2], days[3], days[4]];
		this.setState({
			showDays: showDays,
			moreOrLess: true
		});
	};

	onClickVehicle = index => {
		this.setState({
			selectedVehicleIndex: index
		});
	};

	onClickDay = index => {
		this.setState({
			selectedDayIndex: index
		});
	};

	onClickTime = index => {
		this.setState({
			selectedTimeIndex: index
		});
	};

	onClickContinue = () => {
		const {
			selectedVehicleIndex,
			selectedDayIndex,
			selectedTimeIndex,
			days,
			times
		} = this.state;
		const { vehicles } = this.props;

		if (
			selectedVehicleIndex === undefined ||
			selectedDayIndex === undefined ||
			selectedTimeIndex === undefined
		) {
			alert("You have to select a vehicle, a day and a time");
			return;
		}

		this.props.history.push("/book/contact");
		this.props.dateSelected(
			vehicles[selectedVehicleIndex],
			days[selectedDayIndex],
			times[selectedTimeIndex]
		);
	};

	render() {
		const { vehicles } = this.props;
		const {
			showDays,
			moreOrLess,
			times,
			selectedVehicleIndex,
			selectedDayIndex,
			selectedTimeIndex
		} = this.state;
		return (
			<Container maxWidth="md" style={{ marginBottom: 10 }}>
				<Box mb={2}>
					<Grid container className="vehicle-thumb-panel">
						{vehicles.map((vehicle, i) => (
							<Grid key={vehicle.id} item xs={4}>
								<div
									className={`item ${
										selectedVehicleIndex === i ? "selected" : ""
									}`}
									onClick={this.onClickVehicle.bind(this, i)}
								>
									<img src={vehicle.icon} alt="icon" />
								</div>
							</Grid>
						))}
					</Grid>
				</Box>
				<Box p={1} textAlign="left" fontSize={24}>
					What day do you need us?
				</Box>
				<Box>
					<Grid container>
						{showDays.map((date, i) => (
							<Grid key={i} item sm={2} xs={3}>
								<div
									className={`button date ${
										selectedDayIndex === i ? "selected" : ""
									}`}
									onClick={this.onClickDay.bind(this, i)}
								>
									<div
										className={date.firstDay === true ? "first-day" : "weekday"}
									>
										{date.weekDay}
									</div>
									<div className="day">{date.day}</div>
								</div>
							</Grid>
						))}
						<Grid item sm={2} xs={3}>
							{moreOrLess ? (
								<div
									className="button date more-less"
									onClick={this.onClickMore}
								>
									<div>More</div>
									<div>
										<IoIosArrowDown />
									</div>
								</div>
							) : (
								<div
									className="button date more-less"
									onClick={this.onClickLess}
								>
									<div>
										<IoIosArrowUp />
									</div>
									<div>Less</div>
								</div>
							)}
						</Grid>
					</Grid>
				</Box>
				<Box p={1} mt={3} textAlign="left">
					<Box fontSize={18}>
						When do you want us to arrive to your pickup location?
					</Box>
					<Box fontSize={14} color="var(--colorGray)">
						This is the arrival window. Not the time your Lugg takes.
					</Box>
				</Box>
				<Box py={1}>
					<Grid container>
						{times.map((time, i) => (
							<Grid key={i} item sm={4} xs={6}>
								<div
									className={`button time ${
										selectedTimeIndex === i ? "selected" : ""
									}`}
									onClick={this.onClickTime.bind(this, i)}
									style={{ margin: 4 }}
								>
									{getTimeString(time.from)} - {getTimeString(time.to)}
								</div>
							</Grid>
						))}
					</Grid>
				</Box>
				<div style={{ margin: 4 }}>
					<Button fullWidth className="lug-btn" onClick={this.onClickContinue}>
						Continue
					</Button>
				</div>
			</Container>
		);
	}
}

const mapStateToProps = state => ({
	vehicles: state.vehicles,
	selectedVehicle: state.selectedVehicle,
	selectedLocation: state.selectedLocation
});

const mapDispatchToProps = dispatch => ({
	dateSelected: (vehicle, date, time) =>
		dispatch(dateSelected(vehicle, date, time)),
	setStep: value => dispatch(setStep(value))
});

export default connect(mapStateToProps, mapDispatchToProps)(TimeSelect);
