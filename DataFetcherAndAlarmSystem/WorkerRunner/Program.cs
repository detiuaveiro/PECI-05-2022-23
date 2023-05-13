using AlarmProcessorService;
using AlarmScannerService;
using DAL.Postgres;
using DAL.Redis;
using Domain.ConnectedServices;
using Domain.Services;
using Domain.Services.Alerts;
using Domain.Services.Comunication;
using Domain.Services.Metrics;
using EmailService;
using Microsoft.EntityFrameworkCore;
using NetworkDataFetcher;
using WorkerRunner;

IConfiguration configuration = Startup.loadConfig();

IHost host = Host.CreateDefaultBuilder(args)
    .ConfigureLogging(logging =>
    {
        logging.ClearProviders();
        logging.AddConsole();
    })
    .ConfigureServices(services => {
        services.AddSingleton<DatabaseContextFactory>();
        services.AddSingleton<HttpClient>();
        services.AddSingleton<INetworkController, NetworkController>();
        services.AddSingleton<IMetricsProcessor, MetricsProcessor>();
        services.AddSingleton<IBackend, PeciBackend>();
        services.AddSingleton<IDbContext, DAL.Redis.DbContext>();
        services.AddSingleton<IMessageBus, MessageBus>();
        services.AddSingleton<IAlertService, AlertService>();
        services.AddHostedService<NetworkDataFetcherWorker>();
        services.AddHostedService<AlarmScannerServiceWorker>();
        services.AddHostedService<AlarmProcessorServiceWorker>();
        services.AddHostedService<EmailServiceWorker>();
    })
    .Build();

using (var context = new DatabaseContextFactory(configuration).Create())
    Startup.MakeMigrations(context);

host.Run();
