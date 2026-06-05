import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { CalendarDays, CheckCircle2, Clock, Eye, Pencil, ShieldCheck, Trash } from 'lucide-react';
import { EmptyState, LoadingState } from '@/components/feedback/AppStates';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { useMembers } from '@/features/members/MembersProvider';
import { STATUS_ROUTES } from '@/routes/status-routes';
import { DeleteMemberDialog } from './DeleteMemberDialog';
import { formatDate } from './member-data';
import { Member } from '@shared-types/member/member.types';

function stageVariant(stage: Member['stage']) {
  if (stage === 'Complete') {
    return 'default';
  }

  if (stage === 'Left') {
    return 'destructive';
  }

  return 'secondary';
}

export function HomePage() {
  const navigate = useNavigate();
  const { members, isLoading, deleteMember } = useMembers();
  const [memberPendingDelete, setMemberPendingDelete] = useState<Member | null>(
    null,
  );
  const activeMembers = members.filter((member) => member.stage !== 'Left');
  const promotionReady = members.filter((member) => member.readyForPromotion);
  const probationMembers = members.filter(
    (member) => member.stage === 'Probation',
  );

  return (
    <div className="space-y-6">
      <section className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active members</CardTitle>
            <ShieldCheck className="size-4 text-muted-foreground" aria-hidden="true" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-semibold">{activeMembers.length}</div>
            <p className="text-sm text-muted-foreground">
              Members not marked as left
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Ready for review</CardTitle>
            <CheckCircle2 className="size-4 text-muted-foreground" aria-hidden="true" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-semibold">{promotionReady.length}</div>
            <p className="text-sm text-muted-foreground">
              Promotion-ready members
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">In probation</CardTitle>
            <Clock className="size-4 text-muted-foreground" aria-hidden="true" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-semibold">{probationMembers.length}</div>
            <p className="text-sm text-muted-foreground">
              Applicants and new members being tracked
            </p>
          </CardContent>
        </Card>
      </section>

      <Card>
        <CardHeader className="gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <CardTitle>Member register</CardTitle>
            <CardDescription>
              Local sample data using the shared member model shape.
            </CardDescription>
          </div>
          <Button asChild>
            <Link to="/add">Add member</Link>
          </Button>
        </CardHeader>
        <CardContent>
          {isLoading ? <LoadingState message="Loading members..." /> : null}
          {!isLoading && members.length === 0 ? (
            <EmptyState
              title="No members yet"
              description="Add the first member to start tracking progression."
              actionHref="/add"
              actionLabel="Add member"
            />
          ) : null}
          {!isLoading && members.length > 0 ? (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Username</TableHead>
                  <TableHead>Role</TableHead>
                  <TableHead>Recruiter</TableHead>
                  <TableHead>Joined</TableHead>
                  <TableHead>Sessions</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {members.map((member) => (
                  <TableRow key={member.id}>
                    <TableCell className="font-medium">{member.name}</TableCell>
                    <TableCell>{member.role || 'Unassigned'}</TableCell>
                    <TableCell>{member.recruiter}</TableCell>
                    <TableCell>
                      <span className="flex items-center gap-2">
                        <CalendarDays className="size-4 text-muted-foreground" />
                        {formatDate(member.joinedAt)}
                      </span>
                    </TableCell>
                    <TableCell>
                      {member.joinedMain} main / {member.joinedOther} other
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-wrap gap-2">
                        <Badge variant={stageVariant(member.stage)}>
                          {member.stage}
                        </Badge>
                        {member.readyForPromotion ? (
                          <Badge variant="outline">Promotion ready</Badge>
                        ) : null}
                      </div>
                    </TableCell>
                    <TableCell className="text-left">
                      <Button variant="ghost" size="sm" asChild>
                        <Link to={`/view/${member.id}`}>
                          <Eye className="size-4" aria-hidden="true" />
                          View
                        </Link>
                      </Button>
                      <br />
                      <Button variant="ghost" size="sm" asChild>
                        <Link to={`/edit/${member.id}`}>
                          <Pencil className="size-4" aria-hidden="true" />
                          Edit
                        </Link>
                      </Button>
                      <br />
                      <Button
                        variant="ghost"
                        size="sm"
                        type="button"
                        onClick={() => setMemberPendingDelete(member)}
                      >
                        <Trash className="size-4" aria-hidden="true" />
                        Delete
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          ) : null}
        </CardContent>
      </Card>
      <DeleteMemberDialog
        member={memberPendingDelete}
        open={memberPendingDelete !== null}
        onOpenChange={(open) => {
          if (!open) {
            setMemberPendingDelete(null);
          }
        }}
        onConfirm={() => {
          if (!memberPendingDelete) {
            return;
          }

          deleteMember(memberPendingDelete.id);
          setMemberPendingDelete(null);
          navigate(STATUS_ROUTES.deleted);
        }}
      />
    </div>
  );
}
