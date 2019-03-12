using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Services;
using Newtonsoft.Json;
using System.Web.Script.Services;
using System.Data.OleDb;
using System.Data;
using Nethereum.Web3;
using Nethereum.Geth;
using System.Threading.Tasks;
using System.Threading;
namespace BridgeService
{
    /// <summary>
    /// Summary description for WebService1
    /// </summary>
    [WebService(Namespace = "http://tempuri.org/")]
    [WebServiceBinding(ConformsTo = WsiProfiles.BasicProfile1_1)]
    [System.ComponentModel.ToolboxItem(false)]
    [ScriptService]
    // To allow this Web Service to be called from script, using ASP.NET AJAX, uncomment the following line. 
    // [System.Web.Script.Services.ScriptService]
    public class WebService1 : System.Web.Services.WebService
    {
        private void ExecuteNonQuery(string query)
        {
            try
            {
                string path = @"C:\Anchu\Hackathon\Embracec.accdb;";
                using (var con = new OleDbConnection
                           (@"Provider=Microsoft.ACE.OLEDB.12.0;Data Source=" + path))
                {
                    con.Open();
                    using (OleDbCommand cmd = new OleDbCommand(query, con))
                    {
                        cmd.ExecuteNonQuery();
                    }
                }
            }
            catch { }          
        }

        private string ExecuteReader(string query)
        {
            string path = @"C:\Anchu\Hackathon\Embracec.accdb;";
            DataTable dataset = new DataTable();
            try
            {
                using (var con = new OleDbConnection
                          (@"Provider=Microsoft.ACE.OLEDB.12.0;Data Source=" + path))
                {
                    con.Open();
                    using (OleDbCommand cmd = new OleDbCommand(query, con))
                    {
                        using (OleDbDataAdapter reader = new OleDbDataAdapter(cmd))
                        {
                            reader.Fill(dataset);
                        }
                    }
                }
            }
            catch { }
            return JsonConvert.SerializeObject(dataset, Formatting.Indented);
        }
       
        private string ExecuteScalar(string query)
        {
            object result = null;
            try
            {
                string path = @"C:\Anchu\Hackathon\Embracec.accdb;";                
                using (var con = new OleDbConnection
                          (@"Provider=Microsoft.ACE.OLEDB.12.0;Data Source=" + path))
                {
                    con.Open();
                    using (OleDbCommand cmd = new OleDbCommand(query, con))
                    {
                        result = cmd.ExecuteScalar();
                    }
                }
            }
            catch { }
            return Convert.ToString(result);
        }

        [WebMethod]
        public string ValidateUserLogin(string jsonData)
        {
            var obj = JsonConvert.DeserializeObject<LoginData>(jsonData);
            var query = string.Format("select Id, UserType, LoginId, PhotoId, WalletId from LoginData where LoginId ='{0}' and Password = '{1}'", obj.LoginId, obj.Password);
            return ExecuteReader(query);            
        }

        [WebMethod]
        public string AddBeneficiary(string jsonData)
        {
            var obj = JsonConvert.DeserializeObject<BeneficiaryData>(jsonData);           

            string insertStatement = string.Format(@"insert into Beneficiary (Name, IDProof,RequestAmount, Description,DocumentID, Status, PurposeType, ImageId)
                           values('{0}', '{1}', {2}, '{3}', '{4}', 'New', '{5}', '{6}')", obj.Name, obj.IDProof,obj.RequestAmount,obj.Description,obj.DocumentID, obj.PurposeType, obj.ImageId);
           
           return ExecuteReader(insertStatement);
        }

        [WebMethod]
        public string GetBeneficiaryList(string status)
        {
            string SelectCommand = string.Format(@"select * from  Beneficiary where Status='{0}'", status);
            return ExecuteReader(SelectCommand);                
        }

        [WebMethod]
        public string GetAllBeneficiaryList()
        {
            string SelectCommand = string.Format(@"select * from  Beneficiary");
            return ExecuteReader(SelectCommand);
        }  
     
        [WebMethod]
        public void CreateCampaign(string jsonData)
        {
            var obj = JsonConvert.DeserializeObject<CampaignData>(jsonData);
            string insertStatement = string.Format(@"insert into Campaign (Name, Description, ImageID, MaximumCredit, AvailableCredit,Status,IsCharity, BeneficiaryId)
                           values('{0}', '{1}', '{2}', {3}, {4}, 'Open', {5}, {6})", obj.Name, obj.Description, obj.ImageID, obj.MaximumCredit, 0, obj.IsCharity, obj.BenefId);

             ExecuteNonQuery(insertStatement);

             var updateBeneficiary = "update Beneficiary set Status='Progress' where ID=" + obj.BenefId;
             ExecuteNonQuery(updateBeneficiary);
        }

        [WebMethod]
        public string GetCampaignPercentage()
        {
            var query = "select sum(MaximumCredit) as maxCredit, sum(AvailableCredit) as availCredit from Campaign";
            return ExecuteReader(query);
        }

        [WebMethod]
        public string GetCampaignList()
        {
            string SelectCommand = string.Format(@"select * from  Campaign where status<>'Closed'");
            return ExecuteReader(SelectCommand); 
        }

        [WebMethod]
        public string GetAllCampaignList()
        {
            string SelectCommand = string.Format(@"select * from  Campaign");
            return ExecuteReader(SelectCommand);
        }

        [WebMethod]
        public string GetCountForDashBoard()
        {
            string SelectCommand = string.Format(@"select count(*) from Campaign where status<>'Closed'");
            var compaignCount = ExecuteScalar(SelectCommand);
            SelectCommand = string.Format(@"select distinct ContributorID from ContributionList");
            var contributorsData = ExecuteReader(SelectCommand);
            var data = JsonConvert.DeserializeObject<IEnumerable<ContributionListData>>(contributorsData);
            var contributorsCount = data.Count();
            SelectCommand = string.Format(@"select count(*) from Beneficiary where status<>'Closed'");
            var BeneficiaryCount = ExecuteScalar(SelectCommand);
            List<string> countList = new List<string>();
            countList.Add(compaignCount);
            countList.Add(contributorsCount.ToString());
            countList.Add(BeneficiaryCount);
            return JsonConvert.SerializeObject(countList, Formatting.Indented);
        }

        [WebMethod]
        public string GetBeneficiaryDetails(int beneficiaryId)
        {
            string SelectCommand = string.Format(@"select * from  Beneficiary where ID=" + beneficiaryId);
            return ExecuteReader(SelectCommand);     
        }

        [WebMethod]
        public string GetCampaignCount()
        {
            string SelectCommand = string.Format(@"select Name,Campaign.ImageID as PhotoId , Campaign.MaximumCredit as MaxAmount,Campaign.AvailableCredit as AvailAmount from Campaign where status<>'Closed' order by ID desc");
            return ExecuteReader(SelectCommand); 
        } 

        [WebMethod]
        public string GetContributionList(int ContributorID)
        {
            string SelectCommand = string.Format(@"select * from ContributionList where ContributorID = {0}",ContributorID);
            return ExecuteReader(SelectCommand);
        }

        [WebMethod]
        public string GetContributorDetails(int compaignId)
        {
            string SelectCommand = string.Format(@"select * from  ContributionList a inner join LoginData b on a.ContributorId=b.ID where a.CampaignID=" + compaignId);
            return ExecuteReader(SelectCommand);     
    
        }

        [WebMethod]
        public string GetMyCampaigns(int contributorId)
        {
            string SelectCommand = string.Format(@"select * from  ContributionList a inner join  Campaign b on a.CampaignID=b.ID where a.ContributorID=" + contributorId);
            return ExecuteReader(SelectCommand);     
        }

        [WebMethod]
        public string GetBeneficiaryCampaigns(string beneficiaryId)
        {
            string SelectCommand = string.Format(@"select *, a.Name as Name, a.Description as Description, a.Status as Status from  Campaign a inner join  Beneficiary b on a.BeneficiaryId=b.ID where b.Name='{0}'", beneficiaryId);
            return ExecuteReader(SelectCommand);          
        }

        [WebMethod]
        public string GetCampaignBarGraph()
        {
            string SelectCommand = string.Format(@"select Name, MaximumCredit, AvailableCredit from Campaign where Status = 'Progress' order by ID desc");
            return ExecuteReader(SelectCommand);        
        }

        public async Task<Nethereum.RPC.Eth.DTOs.TransactionReceipt> MineAndGetReceiptAsync(double amount)
        {
            Web3 _web3 = new Web3("http://127.0.0.1:8000");
            var weiValue = Nethereum.Util.UnitConversion.Convert.ToWei(amount);
            var fromAccount = "0xa210410A3f7B8021087C2b51E0cC01B888D4291C";
            var toAccount = "0xC549F09332390eE27D18827a964cC3aaf0157aD6";
            UnlockAccount(_web3, fromAccount);
            UnlockAccount(_web3, toAccount);

            Thread.Sleep(1000);
            var transactionHash = await _web3.TransactionManager.SendTransactionAsync(fromAccount, toAccount, new Nethereum.Hex.HexTypes.HexBigInteger(weiValue));

            Thread.Sleep(2000);
            var web3Geth = new Web3Geth(_web3.Client);

            var miningResult = await web3Geth.Miner.Start.SendRequestAsync(6);

            var receipt = await _web3.Eth.Transactions.GetTransactionReceipt.SendRequestAsync(transactionHash);

           while (receipt == null)
            {
                Thread.Sleep(5000);
                receipt = await _web3.Eth.Transactions.GetTransactionReceipt.SendRequestAsync(transactionHash);
            }
           // Thread.Sleep(10000);
            await web3Geth.Miner.Stop.SendRequestAsync();
            return receipt;
        }

        public void UnlockAccount(Web3 _web3, string accountId, string password = "12345")
        {
            var resultUnlocking =  _web3.Personal.UnlockAccount.SendRequestAsync(accountId, password, 200);          
        }

        [WebMethod]
        public void AddContribution(string jsonData)
        {          
            var obj = JsonConvert.DeserializeObject<ContributionListData>(jsonData);
            string query = string.Format(@"insert into ContributionList (ContributorID, CampaignID, DonatedAmount)
                           values({0}, {1}, '{2}')", obj.ContributorID, obj.CampaignID, obj.DonatedAmount);
           
            ExecuteNonQuery(query);
            var balance = obj.AvailableCredit + obj.DonatedAmount;
            string status="Progress";
            if(balance >= obj.MaximumCredit)
            {
                status="Closed";
            }
            query = string.Format("update campaign set AvailableCredit={0}, Status='{1}' where ID={2}", balance, status, obj.CampaignID);
            ExecuteNonQuery(query);
            if(status == "Closed")
            {
                query = string.Format("update Beneficiary set Status='{0}' where ID={1}", status, obj.BenefId);
                ExecuteNonQuery(query);
            }
            Thread.Sleep(2000);
            MineAndGetReceiptAsync(obj.DonatedAmount);
            Thread.Sleep(5000);
        } 

    }
}
