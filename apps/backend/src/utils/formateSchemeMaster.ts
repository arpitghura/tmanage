// export function formatSchemeMaster(masterData: any) {
//   if (masterData[0].level2.length > 0 && masterData[0].level3.length > 0) {
//     let SchemesDetails = masterData[0].level4;
//     let Schemes = masterData[0].level3;
//     SchemesDetails = SchemesDetails.map((SchemeDetails: any) => {
//       return { ...SchemeDetails, identifier: `${SchemeDetails.scheme}+${SchemeDetails.category}+${SchemeDetails.subcategory}+${SchemeDetails.risktype}` };
//     });
//     let response = SchemesDetails.reduce((res: any, SchemeDetails: any) => {
//       res[SchemeDetails.identifier] = res[SchemeDetails.identifier] || [];
//       res[SchemeDetails.identifier].push(SchemeDetails);
//       return res;
//     }, []);
//     response = Object.entries(response);
//     response = response.map((res: any) => {
//       let data = res[0].split('+');
//       let scheme = Schemes.find((Scheme: any) => Scheme.scheme === data[0]);
//       return {
//         ...scheme,
//         category: data[1],
//         subcategory: data[2],
//         risktype: data[3],
//         schemes: res[1].map((x: any) => {
//           delete x.category;
//           delete x.subcategory;
//           delete x.risktype;
//           delete x.identifier;
//           return x;
//         }),
//       };
//     });
//     return { fund: masterData[0].level2[0].fund, fundname: masterData[0].level2[0].fundname, funds: response };
//   }
// }

// export function formatePortfolio(portfolioData: any) {
//   if (portfolioData[0].level3.length > 0) {
//     let category = portfolioData[0].level4;
//     let subcategory = portfolioData[0].level5;
//     category = category.map((record: any) => {
//       if (subcategory.length == 0) {
//         return { ...record, Subcategory: [] };
//       } else {
//         return {
//           ...record,
//           Subcategory: subcategory.filter((sub: any) => {
//             if (sub.category == record.category) {
//               delete sub.category;
//               delete sub.costvalue;
//               delete sub.currentvalue;
//               return true;
//             }
//             return false;
//           }),
//         };
//       }
//     });
//     return { TotalCurrentValue: portfolioData[0].level2[0], CurrentValue: portfolioData[0].level3, CategoryDetails: category, FolioDetails: portfolioData[0].level6, SchemeDetails: portfolioData[0].level7 };
//   } else {
//     return { TotalCurrentValue: portfolioData[0].level2[0], CurrentValue: portfolioData[0].level3, CategoryDetails: portfolioData[0].level4, FolioDetails: portfolioData[0].level6, SchemeDetails: portfolioData[0].level7 };
//   }
// }
