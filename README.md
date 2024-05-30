# BlogMitDashboarddsfsdfefsdf



      - name: Get S3 Bucket URL
        run: echo "S3_BUCKET_URL=$(terraform output -raw bucket_url)" >> $GITHUB_ENV
        shell: /usr/bin/bash --noprofile --norc -e -o pipefail {0}
        env:
          TERRAFORM_CLI_PATH: /home/runner/work/_temp/5d0f4d43-e1d6-45fc-92ae-4292a6e8bf00
          AWS_DEFAULT_REGION: ${{ secrets.AWS_DEFAULT_REGION }}
          AWS_REGION: ${{ secrets.AWS_DEFAULT_REGION }}
          AWS_ACCESS_KEY_ID: ${{ secrets.AWS_ACCESS_KEY_ID }}
          AWS_SECRET_ACCESS_KEY: ${{ secrets.AWS_SECRET_ACCESS_KEY }}
          AWS_SESSION_TOKEN: ${{ secrets.AWS_SESSION_TOKEN }}