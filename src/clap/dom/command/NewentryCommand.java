package clap.dom.command;

import java.io.File;
import java.io.IOException;
import java.util.*;

import javax.activation.DataHandler;
import javax.activation.FileDataSource;
import javax.mail.*;
import javax.mail.internet.*;

import org.dsrg.soenea.domain.command.CommandException;
import org.dsrg.soenea.domain.command.impl.Command;
import org.dsrg.soenea.domain.command.validator.source.Source;
import org.dsrg.soenea.domain.command.validator.source.impl.AttributeSource;
import org.dsrg.soenea.domain.helper.Helper;

import clap.service.util.HtmlContentParser;
import clap.service.util.MultipartRequest;

public class NewentryCommand extends Command {
	
	public NewentryCommand(Helper helper) {
		super(helper);
	}
	
	public static final String DOCUMENT_FILE_PARM = "fileUpload";
	
	@Source(sources=AttributeSource.class)
	public String realPath;
	
	@Override
	public void execute() throws CommandException {		
		String species = MultipartRequest.getFieldString(helper, "species");
		String pubmed = MultipartRequest.getFieldString(helper, "pubmed");
		String pmid = MultipartRequest.getFieldString(helper, "pmid");
		String author = MultipartRequest.getFieldString(helper, "author");
		String title = MultipartRequest.getFieldString(helper, "title");
		String affiliation = MultipartRequest.getFieldString(helper, "affiliation");
		String journal = MultipartRequest.getFieldString(helper, "journal");
		String year = MultipartRequest.getFieldString(helper, "year");
		String accession = MultipartRequest.getFieldString(helper, "accession");
		String sourceofseq = MultipartRequest.getFieldString(helper, "sourceofseq");
		String assay = MultipartRequest.getFieldString(helper, "assay");
		
		//add if cond		
		String description = MultipartRequest.getFieldString(helper, "description");
		String strain = MultipartRequest.getFieldString(helper, "strain");
		String genename = MultipartRequest.getFieldString(helper, "genename");
		String genealias = MultipartRequest.getFieldString(helper, "genealias");
		String enzymename = MultipartRequest.getFieldString(helper, "enzymename");
		String enzymealias = MultipartRequest.getFieldString(helper, "enzymealias");
		String ecsystemname = MultipartRequest.getFieldString(helper, "ecsystemname");
		String ecnumber = MultipartRequest.getFieldString(helper, "ecnumber");
		String geneid_genbank = MultipartRequest.getFieldString(helper, "geneid(genbank");
		String uniprotid = MultipartRequest.getFieldString(helper, "uniprotid");
		String proteinids_genbank = MultipartRequest.getFieldString(helper, "proteinids(genbank)");
		String proteinid_refseq = MultipartRequest.getFieldString(helper, "proteinid(refseq)");
		String family = MultipartRequest.getFieldString(helper, "family");
		String substrate = MultipartRequest.getFieldString(helper, "substrate");
		String host = MultipartRequest.getFieldString(helper, "host");
		String specificactivity = MultipartRequest.getFieldString(helper, "specificactivity");
		String activityassayconditions = MultipartRequest.getFieldString(helper, "activityassayconditions");
		String substratespecificity = MultipartRequest.getFieldString(helper, "substratespecificity");
		String km = MultipartRequest.getFieldString(helper, "km");
		String kcat = MultipartRequest.getFieldString(helper, "kcat (s-1)");
		String vmax = MultipartRequest.getFieldString(helper, "vmax");
		String kineticassayconditions = helper.getString("kineticassayconditions");
		String productanalysis = MultipartRequest.getFieldString(helper, "productanalysis");
		String productformed = MultipartRequest.getFieldString(helper, "productformed");
		String singalpeptidePredicted = MultipartRequest.getFieldString(helper, "signalpeptidePredicted");
		String nterminalExperimental = MultipartRequest.getFieldString(helper, "nterminalExperimental");
		String pHoptimum = MultipartRequest.getFieldString(helper, "pHoptimum");
		String pHstability = MultipartRequest.getFieldString(helper, "pHstability");
		String tempoptimum = MultipartRequest.getFieldString(helper, "tempoptimum");
		String tempstability = MultipartRequest.getFieldString(helper, "tempstability");
		String ipexperimental = MultipartRequest.getFieldString(helper, "ipexperimental");
		String ippredicted = MultipartRequest.getFieldString(helper, "ippredicted");
		String weightinkdaexperimental = MultipartRequest.getFieldString(helper, "weightinkdaexperimental");
		String weightinkdapredicted = MultipartRequest.getFieldString(helper, "weightinkdapredicted");
		String proteinlength = MultipartRequest.getFieldString(helper, "proteinlength");
		String cbd = MultipartRequest.getFieldString(helper, "cbd");
		String glycosylation = MultipartRequest.getFieldString(helper, "glycosylation");
		String otherfeatures = MultipartRequest.getFieldString(helper, "otherfeatures");
		String gomolecular = MultipartRequest.getFieldString(helper, "gomolecular");
		String evidencegomolecular = MultipartRequest.getFieldString(helper, "evidencegomolecular");
		String goprocess = MultipartRequest.getFieldString(helper, "goprocess");
		String evidencegoprocess = MultipartRequest.getFieldString(helper, "evidencegoprocess");
		String gocomponent = MultipartRequest.getFieldString(helper, "gocomponent");
		String evidencegocomponent = MultipartRequest.getFieldString(helper, "evidencegocomponent");		
				
		String first = MultipartRequest.getFieldString(helper, "first");
		String last = MultipartRequest.getFieldString(helper, "last");
		String subject = MultipartRequest.getFieldString(helper, "subject");
		String sender = MultipartRequest.getFieldString(helper, "email");
		String message = MultipartRequest.getFieldString(helper, "message");
		String receiver = "mycoclap@concordia.ca";
			
		message = HtmlContentParser.removeHTML(message);
		message += "\n\nSpecies: " + species + "\n";
		message += "PubMed: " + pubmed + "\n";
		message += "PMID: " + pmid + "\n";
		message += "Author: " + author + "\n";
		message += "Title: " + title + "\n";
		message += "Affiliation: " + affiliation + "\n";
		message += "Journal: " + journal + "\n";
		message += "Year: " + year + "\n";
		message += "Accession#: " + accession + "\n";
		message += "Source Of Sequence: " + sourceofseq + "\n";
		message += "Assay: " + assay + "\n";
		message += "Description: " + description + "\n";		
		message += "Strain: " + strain + "\n";
		message += "Gene Name:" + genename + "\n";
		message += "Gene Alias: " + genealias + "\n";
		message += "Enzyme Name: " + enzymename + "\n";
		message += "Enzyme Alias: " + enzymealias + "\n";
		message += "EC Systematic Name: " + ecsystemname + "\n";
		message += "EC Number: " + ecnumber + "\n";
		message += "Gene ID (GenBank): " + geneid_genbank + "\n";
		message += "UniProt ID: " + uniprotid + "\n";
		message += "Protein IDs (GenBank): " + proteinids_genbank + "\n";
		message += "RefSeq Protein ID: " + proteinid_refseq + "\n";
 		message += "Family: " + family + "\n";
		message += "Substrate: " + substrate + "\n";
		message += "HOST: " + host + "\n";
		message += "Specific Activity: " + specificactivity + "\n";
		message += "Activity Assay Conditions: " + activityassayconditions + "\n";
		message += "Substrate Specificity (%): " + substratespecificity + "\n";
		message += "Km: " + km + "\n";
		message += "kcat: " + kcat + "\n";
		message += "Vmax: " + vmax + "\n";
		message += "Kinetic Assay Conditions: " + kineticassayconditions + "\n";
		message += "Product Analysis: " + productanalysis + "\n";
		message += "Product Formed: " + productformed + "\n";
		message += "Singal Peptide (predicted): " + singalpeptidePredicted + "\n";
		message += "N-Terminal (experimental): " + nterminalExperimental + "\n";
		message += "pH Optimum: " + pHoptimum + "\n";
		message += "pH Stability: " + pHstability + "\n";
		message += "Temperature Optimum: " + tempoptimum + "\n";
		message += "Temperature Stability: " + tempstability + "\n";
		message += "Isoelectric Point (experimental): " + ipexperimental + "\n";
		message += "Isoelectric Point (predicted): " + ippredicted + "\n";
		message += "Molecular Weight in kDa (experimental): " + weightinkdaexperimental + "\n";
		message += "Molecular Weight in kDa (predicted): " + weightinkdapredicted + "\n";
		message += "Protein Length: " + proteinlength + "\n";
		message += "CBD: " + cbd + "\n";
		message += "Glycosylation: " + glycosylation + "\n";
		message += "Other Features: " + otherfeatures + "\n";
		message += "GO (molecular): " + gomolecular + "\n";
		message += "Evidence for GO (molecular): " + evidencegomolecular + "\n";
		message += "GO (process): " + goprocess + "\n";
		message += "Eevidence for GO (process): " + evidencegoprocess + "\n";
		message += "GO (component): " + gocomponent + "\n";
		message += "Evidence for GO (component): " + evidencegocomponent + "\n";
		
		sender = "(" + first + " " + last + ")" + sender;	
		
				
		try {
			String filename = null;
			File infile = null;					
			Properties props = System.getProperties();
			props.put("mail.smtp.host", "smtp.concordia.ca");
  
			Session session = Session.getInstance(props, null);
			MimeMessage msg = new MimeMessage(session);
			InternetAddress from = new InternetAddress(sender);
			InternetAddress to = new InternetAddress(receiver);
			msg.setFrom(from);
			msg.addRecipient(Message.RecipientType.TO, to);
			msg.setSubject(subject);
			msg.setText(message);
  
			/*
			 *  get upload file and attach it to the message
			 */
			if ( MultipartRequest.getFileName(helper, DOCUMENT_FILE_PARM) != null &&
				MultipartRequest.getFileName(helper, DOCUMENT_FILE_PARM) != ""  ) {
				filename = MultipartRequest.getFileName(helper, DOCUMENT_FILE_PARM);
				infile = MultipartRequest.getTempFile(helper, DOCUMENT_FILE_PARM);

				/*
				 *  create and fill the message part
				 */
				MimeBodyPart msgBodyPart = new MimeBodyPart();
				msgBodyPart.setText(message);
				MimeBodyPart attachmentPart = new MimeBodyPart();		      
  			  
				FileDataSource fileDataSource = new FileDataSource(infile);
				attachmentPart.setDataHandler(new DataHandler(fileDataSource));
				attachmentPart.setFileName(filename);
  
				/*
				 *  create the Multipart and add its parts to it
				 */
				Multipart multipart = new MimeMultipart();		      
				multipart.addBodyPart(msgBodyPart);     
				multipart.addBodyPart(attachmentPart);
				/*
				 *  add the Multipart to the message
				 */
				msg.setContent(multipart);			  
			} 		
			
			Transport.send(msg);
		
			if ( filename != null)
		    	  infile.delete();			
		} catch (AddressException e) {
			throw new CommandException("Incorrect email address!");
		} catch (MessagingException e) {
			throw new CommandException("Unable to send email!");
		} catch (IOException e) {
			throw new CommandException("Unable to find the specified file!");
		} 
	}

}
