package clap.service.util.ip;

import java.net.UnknownHostException;

public class IpFactory {

	public static IpAddress create(String address) throws IpException, UnknownHostException {
		if(InetAddressUtils.isIPv4Address(address)) return new IpV4Address(address);
		else if(InetAddressUtils.isIPv6Address(address)) return new IpV6Address(address);
		else throw new IpException("Unknown address version '" + address + "'");
	}

}
