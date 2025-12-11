module.exports = [
"[externals]/@prisma/client [external] (@prisma/client, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("@prisma/client", () => require("@prisma/client"));

module.exports = mod;
}),
"[project]/lib/db.ts [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "db",
    ()=>db
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f40$prisma$2f$client__$5b$external$5d$__$2840$prisma$2f$client$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/@prisma/client [external] (@prisma/client, cjs)");
;
const globalForPrisma = globalThis;
const db = globalForPrisma.prisma ?? new __TURBOPACK__imported__module__$5b$externals$5d2f40$prisma$2f$client__$5b$external$5d$__$2840$prisma$2f$client$2c$__cjs$29$__["PrismaClient"]();
if ("TURBOPACK compile-time truthy", 1) globalForPrisma.prisma = db;
}),
"[project]/lib/actions/stats.ts [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/* __next_internal_action_entry_do_not_use__ [{"00a0188eb23f60b1fab7d259aa4a08163eef136ecc":"getLandingStats"},"",""] */ __turbopack_context__.s([
    "getLandingStats",
    ()=>getLandingStats
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/build/webpack/loaders/next-flight-loader/server-reference.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$db$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/db.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$validate$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/build/webpack/loaders/next-flight-loader/action-validate.js [app-rsc] (ecmascript)");
;
;
const THRESHOLD = 10;
async function getLandingStats() {
    try {
        // 1. Students Trained: Count students + alumni
        const studentsCount = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$db$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["db"].user.count({
            where: {
                role: {
                    in: [
                        "student",
                        "alumni"
                    ]
                }
            }
        });
        // 2. Active Programs: Count published courses
        const activeProgramsCount = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$db$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["db"].course.count({
            where: {
                published: true
            }
        });
        // 3. Employment Rate: (Accepted Applications / Total Applications) * 100
        const totalApplications = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$db$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["db"].application.count();
        const acceptedApplications = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$db$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["db"].application.count({
            where: {
                status: "accepted"
            }
        });
        const employmentRate = totalApplications >= THRESHOLD ? Math.round(acceptedApplications / totalApplications * 100) : 0;
        // 4. Graduate Startups
        const uniqueSellers = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$db$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["db"].product.findMany({
            distinct: [
                "sellerId"
            ],
            select: {
                sellerId: true
            }
        });
        const graduateStartupsCount = uniqueSellers.length;
        // 5. Total Revenue
        const products = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$db$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["db"].product.findMany({
            select: {
                price: true
            }
        });
        const totalRevenue = products.reduce((acc, curr)=>acc + curr.price, 0);
        // 6. Women Participants
        const womenParticipants = 0;
        // 7. Donors
        const donorsCount = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$db$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["db"].user.count({
            where: {
                role: "donor"
            }
        });
        // 8. Scholarships
        const scholarshipsCount = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$db$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["db"].enrollment.count();
        // 9. Communities
        const jobLocations = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$db$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["db"].job.findMany({
            distinct: [
                'location'
            ],
            select: {
                location: true
            }
        });
        const communitiesCount = jobLocations.length;
        // 10. Program Funding
        const donations = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$db$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["db"].donation.findMany();
        let scholarshipFunded = 0;
        let womenFunded = 0;
        let outreachFunded = 0;
        donations.forEach((d)=>{
            const cause = (d.cause || '').toLowerCase();
            if (cause.includes('scholarship') || cause.includes('tuition')) {
                scholarshipFunded += d.amount;
            } else if (cause.includes('women') || cause.includes('girl')) {
                womenFunded += d.amount;
            } else if (cause.includes('rural') || cause.includes('outreach')) {
                outreachFunded += d.amount;
            }
        });
        return {
            studentsTrained: studentsCount,
            activePrograms: activeProgramsCount,
            employmentRate: employmentRate,
            graduateStartups: graduateStartupsCount,
            totalRevenue: totalRevenue,
            womenParticipants: womenParticipants,
            donorsCount: donorsCount,
            scholarshipsCount: scholarshipsCount,
            communitiesCount: communitiesCount,
            programFunding: {
                scholarships: scholarshipFunded,
                women: womenFunded,
                outreach: outreachFunded
            },
            hasEnoughData: {
                employment: totalApplications >= THRESHOLD,
                startups: graduateStartupsCount >= THRESHOLD,
                donors: donorsCount >= THRESHOLD,
                students: studentsCount >= THRESHOLD
            }
        };
    } catch (error) {
        console.error("Error fetching landing stats:", error);
        return {
            studentsTrained: 0,
            activePrograms: 0,
            employmentRate: 0,
            graduateStartups: 0,
            totalRevenue: 0,
            womenParticipants: 0,
            donorsCount: 0,
            scholarshipsCount: 0,
            communitiesCount: 0,
            programFunding: {
                scholarships: 0,
                women: 0,
                outreach: 0
            },
            hasEnoughData: {
                employment: false,
                startups: false,
                donors: false,
                students: false
            }
        };
    }
}
;
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$validate$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["ensureServerEntryExports"])([
    getLandingStats
]);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(getLandingStats, "00a0188eb23f60b1fab7d259aa4a08163eef136ecc", null);
}),
"[project]/.next-internal/server/app/partners/page/actions.js { ACTIONS_MODULE0 => \"[project]/lib/actions/stats.ts [app-rsc] (ecmascript)\" } [app-rsc] (server actions loader, ecmascript) <locals>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([]);
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$actions$2f$stats$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/actions/stats.ts [app-rsc] (ecmascript)");
;
}),
"[project]/.next-internal/server/app/partners/page/actions.js { ACTIONS_MODULE0 => \"[project]/lib/actions/stats.ts [app-rsc] (ecmascript)\" } [app-rsc] (server actions loader, ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "00a0188eb23f60b1fab7d259aa4a08163eef136ecc",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$actions$2f$stats$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getLandingStats"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f2e$next$2d$internal$2f$server$2f$app$2f$partners$2f$page$2f$actions$2e$js__$7b$__ACTIONS_MODULE0__$3d3e$__$225b$project$5d2f$lib$2f$actions$2f$stats$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$2922$__$7d$__$5b$app$2d$rsc$5d$__$28$server__actions__loader$2c$__ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i('[project]/.next-internal/server/app/partners/page/actions.js { ACTIONS_MODULE0 => "[project]/lib/actions/stats.ts [app-rsc] (ecmascript)" } [app-rsc] (server actions loader, ecmascript) <locals>');
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$actions$2f$stats$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/actions/stats.ts [app-rsc] (ecmascript)");
}),
"[project]/node_modules/next/dist/build/webpack/loaders/next-flight-loader/server-reference.js [app-rsc] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

/* eslint-disable import/no-extraneous-dependencies */ Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "registerServerReference", {
    enumerable: true,
    get: function() {
        return _server.registerServerReference;
    }
});
const _server = __turbopack_context__.r("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react-server-dom-turbopack-server.js [app-rsc] (ecmascript)"); //# sourceMappingURL=server-reference.js.map
}),
"[project]/node_modules/next/dist/build/webpack/loaders/next-flight-loader/action-validate.js [app-rsc] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

// This function ensures that all the exported values are valid server actions,
// during the runtime. By definition all actions are required to be async
// functions, but here we can only check that they are functions.
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "ensureServerEntryExports", {
    enumerable: true,
    get: function() {
        return ensureServerEntryExports;
    }
});
function ensureServerEntryExports(actions) {
    for(let i = 0; i < actions.length; i++){
        const action = actions[i];
        if (typeof action !== 'function') {
            throw Object.defineProperty(new Error(`A "use server" file can only export async functions, found ${typeof action}.\nRead more: https://nextjs.org/docs/messages/invalid-use-server-value`), "__NEXT_ERROR_CODE", {
                value: "E352",
                enumerable: false,
                configurable: true
            });
        }
    }
} //# sourceMappingURL=action-validate.js.map
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__2d1b6b90._.js.map