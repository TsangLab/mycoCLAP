package clap.service.util.ip;

import java.net.InetAddress;
import java.net.UnknownHostException;
import java.nio.ByteBuffer;

public class IpV6Address implements IpAddress {

	protected String address;
	protected Long _1_64bits;
	protected Long _2_64bits;

	public IpV6Address(String address) throws IpException, UnknownHostException {
		if(!InetAddressUtils.isIPv6Address(address)) throw new IpException("Passed address in not IpV6");
		this.address = address;
		this._1_64bits = IpUtil.getLongFromInet6ByteAddress(IpUtil.addressAsBytes(address), 0);
		this._2_64bits = IpUtil.getLongFromInet6ByteAddress(IpUtil.addressAsBytes(address), 1);
	}

	public IpV6Address(Long firstLong, Long secondLong) throws IpException, UnknownHostException {
		InetAddress inetAddress = IpUtil.getInet6AddressFromLongs(firstLong, secondLong);
		this.address = inetAddress.getHostAddress();
		if(!InetAddressUtils.isIPv6Address(this.address)) throw new IpException("Passed address in not IpV6");
		this._1_64bits = firstLong;
		this._2_64bits = secondLong;
	}

	public String getAddress() {
		return address;
	}

	public void setAddress(String address) {
		this.address = address;
	}

	public Long get_1_64bits() {
		return _1_64bits;
	}

	public void set_1_64bits(Long _1_64bits) {
		this._1_64bits = _1_64bits;
	}

	public Long get_2_64bits() {
		return _2_64bits;
	}

	public void set_2_64bits(Long _2_64bits) {
		this._2_64bits = _2_64bits;
	}

	@Override
	public String getHumanReadable() throws Exception {
		try {
			ByteBuffer buf = ByteBuffer.allocate(16);
			buf.putLong(_1_64bits);
			buf.putLong(_2_64bits);
			InetAddress addr = IpUtil.getInet6AddressFromLongs(_1_64bits, _2_64bits);
			return addr.getHostAddress();
		}catch(UnknownHostException e) {
			throw new Exception(e);
		}
	}

}
