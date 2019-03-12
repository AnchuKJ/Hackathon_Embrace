using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace BridgeService
{
    public class CombinedData
    {
        public int MenteeCustId { get; set; }
        public string MenteePurpose { get; set; }
        public string MenteeAmount { get; set; }
        public string MenteeFirstName { get; set; }
        public string MenteeLastName { get; set; }
        public string MenteeDescription { get; set; }
        public string Status { get; set; }
        public string MenteeTypeAssist { get; set; }
        public string MentorFirstName { get; set; }
        public string MentorLastName { get; set; }
        public int MentorCustId { get; set; }
        public string MentorAmount { get; set; }
        public string MentorTypeAssist { get; set; }
        public string MentorPurpose { get; set; }
        public int MenteeId { get; set; }
        public string MentorDescription { get; set; }
        public string AccountId { get; set; }
    }
}