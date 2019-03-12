using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace BridgeService
{
    public class BeneficiaryData
    {
        public string Name { get; set; }
        public string IDProof { get; set; }
        public double RequestAmount { get; set; }
        public string Description { get; set; }
        public string DocumentID { get; set; }
        public string Status { get; set; }
        public string PurposeType { get; set; }
        public string ImageId { get; set; }
    }
    
}