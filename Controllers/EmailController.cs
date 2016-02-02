using System;
using System.Threading.Tasks;
using Microsoft.AspNet.Mvc;
#if DNX451
    using System.Net;
    using System.Net.Mail;
    using System.Text;
    using SendGrid;
#endif

namespace Pixel.Web.Controllers
{
    [Route("api/email")]
    public class EmailController : Controller
    {
        // POST api/email
        [HttpPost]
        public async Task Post(string name, string contactInformation, string message)
        {
#if DNX451
            var myMessage = new SendGridMessage();
            myMessage.From = new MailAddress("noreply@pixeldigitalbyra.se");
            myMessage.AddTo("info@pixeldigitalbyra.se");
            myMessage.Subject = "Kontaktformulär på hemsidan";
            myMessage.Html =
                "<p>Namn:<br/>" + name + "</p>" +
                "<p>Kontaktinformation:<br/>" + contactInformation + "</p>" +
                "<p>Meddelande:<br/>" + message + "</p>";
            var credentials = new NetworkCredential("azure_b634599bc566cf4a88301e4ce930013c@azure.com", "snDGrd19876!");
            var transportWeb = new SendGrid.Web(credentials);
            await transportWeb.DeliverAsync(myMessage);
#else
            throw new Exception("Sending emails not supported.");
#endif
        }
    }
}
