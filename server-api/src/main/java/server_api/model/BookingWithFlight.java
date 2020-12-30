package server_api.model;

import java.sql.Date;
import java.sql.Time;

public interface BookingWithFlight {

	public int getId();

	public String getFirstname();

	public String getLastname();

	public String getPhone();

	public int getAge();
	
	public int getSeatNumber();

	public String getFlightCode();

	public String getSource();

	public String getDestination();

	public String getSrcCity();

	public String getDestCity();

	public Date getDate();

	public Time getDeparture();

	public Time getArrival();
}