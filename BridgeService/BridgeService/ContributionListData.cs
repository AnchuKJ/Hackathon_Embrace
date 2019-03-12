using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace BridgeService
{
    public class ContributionListData
    {
            public string ContributorID { get; set; }
            public int CampaignID { get; set; }
            public double DonatedAmount { get; set; }
            public double MaximumCredit { get; set; }
            public double AvailableCredit { get; set; }
            public bool IsCharity { get; set; }
            public int BenefId { get; set; }

    }
}