import { Database, Participant, Plan, PlanInsert } from '@/lib/database.types';
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';
import { v4 as uuid } from "uuid";

export async function GET() {
    const cookieStore = cookies()
    const supabase = createRouteHandlerClient<Database>({ cookies: () => cookieStore });

    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
        return NextResponse.json({
            error: { message: "User not signed in" },
            plans: []
        }, { status: 401 });
    }

    let { data: plans }: {
        data: Plan[] | null,
    } = await supabase
        .from("plans")
        .select()
        .eq('user_id', user.id);

    if (!plans) plans = [];

    for (let i = 0; i < plans.length; i++) {
        let { data: participants }: {
            data: Participant[] | null,
        } = await supabase
            .from("participants")
            .select()
            .eq('plan_id', plans[i].id);

        plans[i].participants = participants || [];
    }

    return NextResponse.json({ plans });
}

export async function POST(request: NextRequest) {
    const cookieStore = cookies()
    const supabase = createRouteHandlerClient<Database>({ cookies: () => cookieStore });

    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
        return NextResponse.json({
            error: { message: "User not signed in" },
            plans: []
        }, { status: 401 });
    }

    const body: PlanInsert = await request.json();

    const newPlan: PlanInsert = {
        ...body,
        id: uuid(),
        user_id: user.id,
    };

    let { data: plan, error } = await supabase
        .from("plans")
        .insert(newPlan)
        .select();

    if (error) {
        return NextResponse.json({ error }, { status: 400 });
    }

    return NextResponse.json({ plan });
}

export default GET;