package clap.service.util;

import java.io.DataOutputStream;
import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.util.Map;

import org.apache.commons.fileupload.FileItem;
import org.dsrg.soenea.domain.helper.Helper;

public class MultipartRequest {

	public static String FORM_ITEM_STRING = "formItems";
	public static String FILE_ITEM_STRING = "fileItems";

	public static File getTempFile(Helper helper, String pName) throws IOException{
		if (helper.getRequestAttribute(FILE_ITEM_STRING) == null)
			return null;
		FileItem f = ((Map<String, FileItem>)helper.getRequestAttribute(FILE_ITEM_STRING)).get(pName);
		FileUploadUtil util = new FileUploadUtil((String)helper.getRequestAttribute("realPath"));
			if (f.getName().length()>0 && f.getSize()>0) {
				byte[] fileData = f.get();
				String extension = FileUploadUtil.getFileNameExtension(f.getName());
		        File file;
					file = util.getTempFile(extension);
		        file.deleteOnExit();
				DataOutputStream dataOut = new DataOutputStream(new FileOutputStream(file));
				dataOut.write(fileData);
				dataOut.flush();
				dataOut.close();
				return file;
			}
		return null;
	}
	
	public static File getFile(Helper myHelper, String pName) throws IOException{
		File f = getTempFile(myHelper,pName);
		if(f == null)
			return null;
		FileUploadUtil util = new FileUploadUtil((String)myHelper.getRequestAttribute("realPath"));
		String fileUrl = util.copyTempFileToPermanent(util.getRelativeFilePath(f).replace('\\', '/'));
		f.delete();
		return new File(util.getAbsoluteFilePath(fileUrl));
	}

	public static String getFileName(Helper myHelper, String pName) {
		Map<String, FileItem> itemMap = (Map<String, FileItem>)myHelper.getRequestAttribute(FILE_ITEM_STRING);
		if (itemMap == null)
			return null;
		FileItem f = itemMap.get(pName);
		if (f == null)
			return null;
		return f.getName();
	}
	
	public static String getFieldString(Helper myHelper, String pName) {
		Map<String, Object> itemMap = (Map<String, Object>)myHelper.getRequestAttribute(FORM_ITEM_STRING);
		if (itemMap == null)
			return null;
		String s = (String) itemMap.get(pName);
		if (s == null)
			return null;
		return s;
	}
	
}
