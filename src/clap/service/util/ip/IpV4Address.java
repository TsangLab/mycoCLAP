package clap.service.util.ip;

import java.net.InetAddress;
import java.net.UnknownHostException;

public class IpV4Address implements IpAddress {

	protected String address;
	protected Integer _32bits;

	public IpV4Address(String address) throws IpException, UnknownHostException {
		if(!InetAddressUtils.isIPv4Address(address)) throw new IpException("Supplied address in not V4");
		this.address = address;
		this._32bits = IpUtil.getIp4AddressAsInteger(address);
	}

	public IpV4Address(Integer _32bits) throws IpException, UnknownHostException {
		InetAddress inetAddress = IpUtil.getInet4AddressFromInteger(_32bits);
		this.address = inetAddress.getHostAddress();
		if(!InetAddressUtils.isIPv4Address(this.address)) throw new IpException("Supplied address in not V4");
		this._32bits = _32bits;
	}

	@Override
	public String getHumanReadable() throws UnknownHostException {
		return IpUtil.getInet4AddressFromInteger(_32bits).getHostAddress();
	}

	public String getAddress() {
		return address;
	}

	public void setAddress(String address) {
		this.address = address;
	}

	public Integer get_32bits() {
		return _32bits;
	}

	public void set_32bits(Integer _32bits) {
		this._32bits = _32bits;
	}

}
