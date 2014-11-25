package clap.service.util.ip;

import java.net.Inet4Address;
import java.net.Inet6Address;
import java.net.InetAddress;
import java.net.UnknownHostException;
import java.nio.ByteBuffer;
import java.nio.IntBuffer;
import java.nio.LongBuffer;


public class IpUtil {
	
	public static Integer getIp4AddressAsInteger(String address) throws UnknownHostException {
		ByteBuffer byteBuffer = ByteBuffer.wrap(addressAsBytes(address));
		IntBuffer intBuffer = byteBuffer.asIntBuffer();
		return intBuffer.get(0);
	}
	
	public static InetAddress getInet4AddressFromInteger(Integer _32bits) throws UnknownHostException {
		ByteBuffer buf = ByteBuffer.allocate(4);
		buf.putInt(_32bits);
		return Inet4Address.getByAddress(buf.array());
	}
	
	public static InetAddress getInet6AddressFromLongs(Long firstLong, Long secondLong) throws UnknownHostException {
		ByteBuffer buf = ByteBuffer.allocate(16);
		buf.putLong(firstLong);
		buf.putLong(secondLong);
		return Inet6Address.getByAddress(buf.array());
	}
	
	public static Long getLongFromInet6ByteAddress(byte[] address, int whichLong) {
		ByteBuffer byteBuffer = ByteBuffer.wrap(address);
		LongBuffer longBuffer = byteBuffer.asLongBuffer();
		return longBuffer.get(whichLong);
	}
	
	public static byte[] addressAsBytes(String address) throws UnknownHostException {
		InetAddress addr = InetAddress.getByName(address);
		return addr.getAddress();
	}
	

}
