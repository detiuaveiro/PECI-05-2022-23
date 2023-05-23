using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using DAL.Postgres;
using Microsoft.EntityFrameworkCore;

namespace WorkerRunner
{
    public class Startup
    {
        public static void MakeMigrations(DatabaseContext context)
        {
            context.Database.EnsureCreated();
        }

        public static IConfiguration loadConfig()
        {
            var builder = new ConfigurationBuilder()
                .SetBasePath(Directory.GetCurrentDirectory())
                .AddJsonFile("appsettings.json", optional: true, reloadOnChange: true)
                .AddJsonFile($"appsettings.{Environment.GetEnvironmentVariable("ASPNETCORE_ENVIRONMENT") ?? "Production"}.json", optional: true)
                .AddEnvironmentVariables();
            var config = builder.Build();
            validateConfig(config);
            return config;
        }

        private static void validateConfig(IConfiguration config)
        {
            if (config["BackendUrl"] == null ||
                config["ControllerUrl"] == null ||
                config["RedisConnectionString"] == null) 
                throw new Exception("Invalid configuration");
        }
    }
}
