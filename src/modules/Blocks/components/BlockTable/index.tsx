import React from 'react';
import { createStyles, withStyles } from '@material-ui/core/styles';
import Table from '@/common/Table';
import Typography from '@material-ui/core/Typography';
import BaseRouteLink from '@/common/BaseRouteLink';
import formatTime from '@/utils/formatTime';
import formatNumber from '@/utils/formatNumber';

const useStyles = () => createStyles({
  transactionsCol: {
    flex: '1 100 auto',
  },
  validatorCol: {
    flex: '1 100 auto',
  },
});

interface ExternalProps {
  blocks: any,
  sizeVisibleAt: string,
  authorVisibleAt: string,
  className?: string,
}

interface InternalProps {
  classes: any,
}

interface Props extends ExternalProps, InternalProps {}

class Index extends React.PureComponent<Props> {
  render() {
    const { blocks, authorVisibleAt, className, classes } = this.props;
    const heightValues: any[] = [];
    const timeValues: any[] = [];
    const transactionsValues: any[] = [];
    const authorValues: any[] = [];
    blocks.forEach((block: any) => {
      const header = block._source.header;
      const blockUrl = `/blocks/detail/${header.block_hash}`;
      // TODO: author info need to be decoded from sdk 3
      const authorUrl = `/author/${header.author}`;
      // heightValues.push(<BlockIndexLink blockIndex={header.number} />);
      // timeValues.push(<BlockTime blockTime={header.timestamp} />);
      heightValues.push(<BaseRouteLink to={blockUrl}>{header.number}</BaseRouteLink>);
      timeValues.push(<Typography>{formatTime(header.timestamp)}</Typography>);
      transactionsValues.push(formatNumber(block._source.body.Full.length));
      authorValues.push(
        // <AddressLink addressHash={header.author} />
        <BaseRouteLink to={authorUrl}>{header.author}</BaseRouteLink>
      );
    });
    const columns = [
      {
        name: 'Height',
        values: heightValues,
        minWidth: true,
      },
      {
        name: 'Time',
        values: timeValues,
        minWidth: true,
      },
      {
        name: 'Transactions',
        numeric: true,
        values: transactionsValues,
        className: classes.transactionsCol,
      },
      {
        name: 'Author',
        values: authorValues,
        visibleAt: authorVisibleAt,
        className: classes.validatorCol,
      },
    ];
    return <Table className={className} columns={columns} />;
  }
}

export default withStyles(useStyles)(Index);