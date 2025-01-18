# Use a lightweight AWS Lambda Node.js base image
FROM public.ecr.aws/lambda/nodejs:18

# Install only required system dependencies for Playwright and Firefox
RUN yum install -y \
    libX11 \
    libxcb \
    libXcomposite \
    libXdamage \
    libXtst \
    xorg-x11-fonts-Type1 \
    fontconfig \
    mesa-libGL \
    mesa-libgbm \
    pango \
    gtk3 \
    && yum clean all && rm -rf /var/cache/yum

# Install Playwright
RUN npm install playwright --save && \
    npx playwright install firefox
    
# Copy application files
WORKDIR /var/task
COPY src/scraper.js .

# Define the Lambda function entry point
CMD ["index.handler"]
