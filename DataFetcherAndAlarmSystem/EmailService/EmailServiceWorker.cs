using Domain.Models;
using Domain.Services.Comunication;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using StackExchange.Redis;
using System.Net.Mail;
using System.Text.Json;

namespace EmailService
{
    public class EmailServiceWorker : BackgroundService
    {
        private readonly ILogger<EmailServiceWorker> _logger;
        private readonly IMessageBus _messageBus;

        public EmailServiceWorker(ILogger<EmailServiceWorker> logger, IMessageBus messageBus)
        {
            _logger = logger;
            _messageBus = messageBus;
        }

        protected override async Task ExecuteAsync(CancellationToken stoppingToken)
        {
            while (!stoppingToken.IsCancellationRequested)
            {
                _logger.LogInformation("Worker running at: {time}", DateTimeOffset.Now);
                _messageBus.Subscribe("emails", handler);
                await Task.Delay(10000, stoppingToken);
            }
        }

        private void handler(RedisChannel arg1, RedisValue arg2)
        {
            SmtpClient client = new SmtpClient("smtp.gmail.com", 587);
            client.UseDefaultCredentials = false;
            client.Credentials = new System.Net.NetworkCredential("jtomaspm@gmail.com", "M0rg0th0!");
            client.EnableSsl = true;

            var msg = JsonSerializer.Deserialize<EmailSubmition>(arg2.ToString());
            if (msg == null) return;
            MailMessage message = new MailMessage();
            message.From = new MailAddress("jtomaspm@gmail.com");
            message.To.Add("jtomaspm.99@gmail.com");
            message.Subject = "Alert Peci!";
            message.Body = msg.Content;

            // Send the email
            client.Send(message);
        }
    }
}