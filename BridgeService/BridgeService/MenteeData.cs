using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace BridgeService
{
    public class MenteeData
    {
        public int SlNo { get; set; }
        public int CustId { get; set; }
        public string Purpose { get; set; }
        public string TypeAssist { get; set; }
        public string Amount { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Description { get; set; }
    }
}