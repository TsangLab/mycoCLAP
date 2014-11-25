package clap.test.util;

import java.io.DataInputStream;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.IOException;

public class FileUtil
{
    public static String readFileString(File file) throws IOException
    {
        return new String(readFileBytes(file), "UTF-8");
    }
    public static byte[] readFileBytes(final File file) throws IOException
    {
        final DataInputStream dis = new DataInputStream(new FileInputStream(file));
        final byte[] bytes = new byte[(int)file.length()];
        dis.readFully(bytes);
        dis.close();
        return bytes;
    }
    public static void writeFileString(final File file, String str) throws IOException
    {
        writeFileBytes(file, str.getBytes());
    }
    public static void writeFileBytes(final File file, byte[] bytes) throws IOException
    {
        final FileOutputStream out = new FileOutputStream(file);
        out.write(bytes);
        out.flush();
        out.close();
    }
    public static void deleteRecursive(File file) throws IOException
    {
        if (file.isDirectory()) {
            for (File child : file.listFiles())
                deleteRecursive(child);
        }
        if (!file.delete() && file.exists())
          throw new IOException("Could not delete: " + file.getAbsolutePath());
    }
}
