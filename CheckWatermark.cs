using System;
using DocumentFormat.OpenXml.Packaging;
using System.Linq;

class Program
{
    static void Main(string[] args)
    {
        string filePath = @"C:\Users\ASUS\Downloads\Từ tiếng Hàn -dothuha (6).docx";
        try
        {
            using var fileStream = new System.IO.FileStream(filePath, System.IO.FileMode.Open, System.IO.FileAccess.Read, System.IO.FileShare.ReadWrite);
            using var document = WordprocessingDocument.Open(fileStream, false);
            var customPropsPart = document.CustomFilePropertiesPart;
            if (customPropsPart?.Properties != null)
            {
                Console.WriteLine("Custom properties found. Exploring:");
                foreach(var p in customPropsPart.Properties.Elements<DocumentFormat.OpenXml.CustomProperties.CustomDocumentProperty>()) {
                    Console.WriteLine($" - {p.Name?.Value} : {p.VTLPWSTR?.Text} / {p.InnerText}");
                }

                var prop = customPropsPart.Properties
                    .Elements<DocumentFormat.OpenXml.CustomProperties.CustomDocumentProperty>()
                    .FirstOrDefault(p => p.Name?.Value == "InsiderThreat:ID");
                
                if (prop != null)
                {
                    Console.WriteLine($"Found! ID: {prop.VTLPWSTR?.Text}");
                }
                else
                {
                    Console.WriteLine("Property InsiderThreat:ID NOT found.");
                }
            }
            else
            {
                Console.WriteLine("No CustomFilePropertiesPart found.");
            }
        }
        catch (Exception ex)
        {
            Console.WriteLine($"Error: {ex.Message}");
        }
    }
}
