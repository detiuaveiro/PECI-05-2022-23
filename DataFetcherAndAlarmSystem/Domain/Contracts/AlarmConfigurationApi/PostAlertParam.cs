namespace Domain.Contracts.AlarmConfigurationApi
{
    public class PostAlertParam
    {
        public string? Name { get; set; }
        public string? Type { get; set; }
        public bool validate()
        {
            return Name != null && Type != null;
        }
    }
}