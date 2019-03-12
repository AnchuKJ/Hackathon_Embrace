using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace BridgeService
{
    public class CampaignData
    {
        public string Name { get; set; }             
        public string Description { get; set; }
        public string ImageID { get; set; }
        public double MaximumCredit { get; set; }
        public double AvailableCredit { get; set; }
        public string Status { get; set; }
        public bool IsCharity { get; set; }
        public int BenefId { get; set; }
    }
}